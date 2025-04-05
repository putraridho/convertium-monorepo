"use client";

import { Button, Grid, InputCheckbox, InputText, Typography, VStack } from "@convertium/ui";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <VStack gap={10} className="max-w-md mx-auto items-center pt-40">
      <Typography as="h1" size="h1">
        Welcome to <strong>myApp</strong>
      </Typography>
      <Grid className="grid-cols-[80px,_1fr] gap-4 w-full max-w-96 items-center">
        <label>User ID</label>
        <InputText size="md" />
        <label>Password</label>
        <InputText
          type={showPassword ? "text" : "password"}
          size="md"
          suffix={
            <button type="button" className="flex p-1 -mr-1" onClick={() => setShowPassword((curr) => !curr)}>
              {showPassword ? <EyeSlash size={20} weight="bold" /> : <Eye size={20} weight="bold" />}
            </button>
          }
        />
      </Grid>

      <InputCheckbox>Keep me logged in</InputCheckbox>

      <Button>LOGIN</Button>

      <Typography>
        No account?{" "}
        <Link href="/register" className="underline">
          Register here
        </Link>
      </Typography>
    </VStack>
  );
}
