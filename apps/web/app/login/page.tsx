"use client";

import { Button, Grid, InputCheckbox, InputText, toast, Typography, VStack } from "@convertium/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Link from "next/link";
import { API } from "packages/services/src";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  userId: z.string().min(1),
  password: z.string().min(1),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useMemo(() => {
    const submitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
      try {
        const token = await API.getOrCreateInstance().user().login({
          user_id: data.userId,
          password: data.password,
        });
        console.log("🚀 ~ token ~ token:", token);
      } catch (e) {
        if (e instanceof Error) {
          if (e.message.includes("user_profile_user_id_key")) {
            toast.danger({ title: "User ID already taken" });
          }
        }
      }
    };

    return handleSubmit(submitHandler);
  }, [handleSubmit]);

  return (
    <form onSubmit={onSubmit}>
      <VStack gap={10} className="max-w-md mx-auto items-center pt-40">
        <Typography as="h1" size="h1">
          Welcome to <strong>myApp</strong>
        </Typography>
        <Grid className="grid-cols-[80px,_1fr] gap-4 w-full max-w-96 items-center">
          <label>User ID</label>
          <InputText size="md" {...register("userId")} />
          <label>Password</label>
          <InputText
            type={showPassword ? "text" : "password"}
            size="md"
            suffix={
              <button type="button" className="flex p-1 -mr-1" onClick={() => setShowPassword((curr) => !curr)}>
                {showPassword ? <EyeSlash size={20} weight="bold" /> : <Eye size={20} weight="bold" />}
              </button>
            }
            {...register("password")}
          />
        </Grid>

        <InputCheckbox>Keep me logged in</InputCheckbox>

        <Button type="submit" disabled={!isValid} loading={isSubmitting}>
          LOGIN
        </Button>

        <Typography>
          No account?{" "}
          <Link href="/register" className="underline">
            Register here
          </Link>
        </Typography>
      </VStack>
    </form>
  );
}
