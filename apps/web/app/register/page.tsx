"use client";

import { Button, Grid, InputText, Typography, VStack } from "@convertium/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  userId: z.string().min(1),
  password: z.string().min(1),
});

export default function RegisterPage() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    register,
    formState: { isValid },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
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
      </Grid>

      <Button disabled={!isValid}>REGISTER</Button>

      <Typography>
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Go to login
        </Link>
      </Typography>
    </VStack>
  );
}
