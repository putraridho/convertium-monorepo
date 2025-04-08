"use client";

import { API } from "@convertium/services";
import { Button, Grid, InputText, toast, Typography, VStack } from "@convertium/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  userId: z.string().min(1),
  password: z.string().min(1),
});

export default function RegisterPage() {
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    register,
    watch,
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useMemo(() => {
    const submitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
      if (data.password !== confirmPassword) {
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
      } catch (e) {
        if (e instanceof Error) {
          if (e.message.includes("user_profile_user_id_key")) {
            toast.danger({ title: "User ID already taken" });
          }
        }
      }
    };

    return handleSubmit(submitHandler);
  }, [confirmPassword, handleSubmit, router]);

  return (
    <form onSubmit={onSubmit}>
      <VStack gap={10} className="max-w-md mx-auto items-center pt-40">
        <Typography as="h1" size="h1">
          Welcome to <strong>myApp</strong>
        </Typography>
        <Grid className="grid-cols-[80px,_1fr] gap-4 w-full max-w-96 items-center">
          <label className="text-sm">User ID</label>
          <InputText size="md" {...register("userId")} />
          <label className="text-sm">Password</label>
          <InputText type="password" size="md" {...register("password")} />
          <label className="text-sm">Confirm Password</label>
          <InputText
            type="password"
            size="md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Grid>{" "}
        <Button type="submit" disabled={!isValid || watch("password") !== confirmPassword} loading={isSubmitting}>
          REGISTER
        </Button>
        <Typography>
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Go to login
          </Link>
        </Typography>
      </VStack>
    </form>
  );
}
