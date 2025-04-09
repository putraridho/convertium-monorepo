/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ProfileFormItem } from "@/modules/profile";
import { useUser } from "@/providers";
import { getQueryClient } from "@convertium/queries";
import { API } from "@convertium/services";
import { Avatar, Button, HStack, InputFile, InputText, Select, toast, VStack } from "@convertium/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  profile_photo_url: z.string().optional(),
  salutation: z.string().nonempty(),
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  email: z.string().email().nonempty(),
});

export default (function BasicDetailsPage() {
  const router = useRouter();
  const me = useUser();
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    reset,
    formState: { isValid, isSubmitting, isDirty },
    handleSubmit,
    control,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    values: {
      profile_photo_url: me?.profile_photo_url,
      salutation: me?.salutation || "",
      first_name: me?.first_name || "",
      last_name: me?.last_name || "",
      email: me?.email || "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useMemo(() => {
    const submitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
      try {
        await API.getOrCreateInstance()
          .user()
          .update({
            ...data,
          });
        getQueryClient().invalidateQueries({ queryKey: ["me"] });
        toast.default({ title: "Profile is successfully updated" });
        router.push("/profile/basic-details");
      } catch (e) {
        if ((e as any).response?.data?.errors) {
          Object.values((e as any).response.data.errors).forEach((value) => {
            toast.danger({ title: String(value) });
          });
        }
      }
    };

    return handleSubmit(submitHandler);
  }, [router, handleSubmit]);

  return (
    <form onSubmit={onSubmit}>
      <VStack gap={8} className="max-w-xl">
        <VStack gap={8} className="items-center md:flex-row">
          <Avatar
            src={file ? URL.createObjectURL(file) : undefined}
            name={[me?.first_name, me?.last_name].filter(Boolean).join(" ") || undefined}
            size={128}
            className="text-2xl"
          />
          <InputFile accept="image/*" className="flex-1" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </VStack>
        <ProfileFormItem label="Salutation" required>
          <Controller
            name="salutation"
            control={control}
            render={({ field }) => (
              <Select.Root
                aria-label="Salutation"
                selectionMode="single"
                placeholder="E.g. Mr."
                {...{ selectedKeys: watch("salutation") ? [watch("salutation") as string] : undefined }}
                {...field}
              >
                <Select.Item key="Mr.">Mr.</Select.Item>
                <Select.Item key="Ms.">Ms.</Select.Item>
                <Select.Item key="Mrs.">Mrs.</Select.Item>
              </Select.Root>
            )}
          />
        </ProfileFormItem>
        <ProfileFormItem label="First name" required>
          <InputText
            aria-label="First name"
            placeholder="E.g. John"
            value={watch("first_name")}
            {...register("first_name")}
          />
        </ProfileFormItem>
        <ProfileFormItem label="Last name" required>
          <InputText
            aria-label="Last name"
            placeholder="E.g. Doe"
            value={watch("last_name")}
            {...register("last_name")}
          />
        </ProfileFormItem>
        <ProfileFormItem label="Email address" required>
          <InputText
            aria-label="Email address"
            type="email"
            placeholder="E.g. john.doe@email.com"
            value={watch("email")}
            {...register("email")}
          />
        </ProfileFormItem>
        <HStack gap={4} className="justify-end">
          <Button type="reset" variant="light" onClick={() => reset()} disabled={!isDirty}>
            Reset
          </Button>
          <Button type="submit" disabled={!isValid || !isDirty} loading={isSubmitting}>
            Submit
          </Button>
        </HStack>
      </VStack>
    </form>
  );
});
