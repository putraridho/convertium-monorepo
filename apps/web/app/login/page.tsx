/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TOKEN_KEY } from "@convertium/constants";
import { getQueryClient } from "@convertium/queries";
import { API } from "@convertium/services";
import { Button, FullPageLoading, Grid, InputCheckbox, InputText, toast, Typography, VStack } from "@convertium/ui";
import { setToken } from "@convertium/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  userId: z.string().min(1),
  password: z.string().min(1),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { isValid, isSubmitting, isSubmitSuccessful },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useMemo(() => {
    const submitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
      try {
        const response = await API.getOrCreateInstance().user().login({
          user_id: data.userId,
          password: data.password,
        });
        const token = response?.data?.token;
        if (!!token) {
          setToken(token);

          const res = await API.getOrCreateInstance().user().me();
          const queryClient = getQueryClient();
          await queryClient.invalidateQueries({ queryKey: [TOKEN_KEY] });
          await queryClient.prefetchQuery({
            queryKey: ["me"],
            queryFn: async () => res,
          });

          toast.success({
            title: "Logged in",
            description: "You have been successfully logged in",
          });
          router.push("/profile");
        }
      } catch (e) {
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
      <VStack gap={16} className="md:gap-10 max-w-md mx-auto items-center pt-24 md:pt-40 px-4">
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
      {isSubmitSuccessful && <FullPageLoading />}
    </form>
  );
}
