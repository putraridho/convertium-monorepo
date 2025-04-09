/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ProfileFormItem } from "@/modules/profile";
import { useUser } from "@/providers";
import { getQueryClient } from "@convertium/queries";
import { API } from "@convertium/services";
import { Button, HStack, InputText, Select, toast, VStack } from "@convertium/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  spouse_salutation: z.string().nonempty(),
  spouse_first_name: z.string().nonempty(),
  spouse_last_name: z.string().nonempty(),
});

export default function SpouseDetailsPage() {
  const router = useRouter();
  const me = useUser();

  const {
    register,
    reset,
    formState: { isValid, isSubmitting, isDirty },
    handleSubmit,
    control,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    values: {
      spouse_salutation: me?.spouse_salutation || "",
      spouse_first_name: me?.spouse_first_name || "",
      spouse_last_name: me?.spouse_last_name || "",
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
        router.push("/profile/spouse-details");
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
        <ProfileFormItem label="Salutation" required>
          <Controller
            name="spouse_salutation"
            control={control}
            render={({ field }) => (
              <Select.Root
                aria-label="Salutation"
                selectionMode="single"
                placeholder="E.g. Mrs."
                {...{ selectedKeys: watch("spouse_salutation") ? [watch("spouse_salutation") as string] : undefined }}
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
            placeholder="E.g. Jane"
            value={watch("spouse_first_name")}
            {...register("spouse_first_name")}
          />
        </ProfileFormItem>
        <ProfileFormItem label="Last name" required>
          <InputText
            aria-label="Last name"
            placeholder="E.g. Doe"
            value={watch("spouse_last_name")}
            {...register("spouse_last_name")}
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
}
