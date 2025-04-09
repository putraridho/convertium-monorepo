/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { API } from "@convertium/services";
import { Button, FullPageLoading, Grid, InputText, toast, Typography, VStack } from "@convertium/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  userId: z.string().min(1),
  password: z.string().min(6),
  confirmPassword: z.string(),
});

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    watch,
    formState: { isValid, isSubmitting, isSubmitSuccessful, touchedFields },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isMatch = watch("password") === watch("confirmPassword");

  const onSubmit = useMemo(() => {
    const submitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
      if (data.password !== data.confirmPassword) {
        toast.danger({ title: "Passwords do not match" });
        return;
      }

      try {
        await API.getOrCreateInstance().user().register({
          user_id: data.userId,
          password: data.password,
        });
        toast.default({ title: "Registration completed." });
        router.push("/login");
      } catch (e: unknown) {
        if ((e as any).response?.data?.errors) {
          Object.values((e as any).response.data.errors).forEach((value) => {
            toast.danger({ title: String(value) });
          });
        }
      }
    };

    return handleSubmit(submitHandler);
  }, [handleSubmit, router]);

  return (
    <form onSubmit={onSubmit}>
      <VStack gap={10} className="max-w-md mx-auto items-center pt-40 px-4">
        <Typography as="h1" size="h1">
          Welcome to <strong>myApp</strong>
        </Typography>
        <Grid className="grid-cols-[80px,_1fr] gap-4 w-full max-w-96 items-center">
          <label className="text-sm">User ID</label>
          <InputText size="md" {...register("userId")} />
          <label className="text-sm">Password</label>
          <InputText type="password" size="md" {...register("password")} />
          {touchedFields.password && watch("password")?.length < 6 && (
            <>
              <div />
              <Typography size="xs" weight="medium" className="text-danger -mt-2">
                Password must be at least 6 characters long
              </Typography>
            </>
          )}
          <label className="text-sm">Confirm Password</label>
          <InputText type="password" size="md" {...register("confirmPassword")} />
          {touchedFields.confirmPassword && !isMatch && (
            <>
              <div />
              <Typography size="xs" weight="medium" className="text-danger -mt-2">
                Passwords do not match
              </Typography>
            </>
          )}
        </Grid>
        <Button type="submit" disabled={!isValid || !isMatch} loading={isSubmitting}>
          REGISTER
        </Button>
        <Typography>
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Go to login
          </Link>
        </Typography>
      </VStack>
      {isSubmitSuccessful && <FullPageLoading />}
    </form>
  );
}
