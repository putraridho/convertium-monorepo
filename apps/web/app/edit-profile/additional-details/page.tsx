/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ProfileFormItem } from "@/modules/profile";
import { useUser } from "@/providers";
import { getQueryClient } from "@convertium/queries";
import { API } from "@convertium/services";
import { Button, Datepicker, HStack, Select, Textarea, toast, VStack } from "@convertium/ui";
import { getLocalTimeZone, parseDate, tz } from "@convertium/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  address: z.string().optional(),
  country: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: z.string().optional(),
  martial_status: z.string().optional(),
});

export default function AdditionalDetailsPage() {
  const router = useRouter();
  const me = useUser();

  const {
    reset,
    formState: { isValid, isSubmitting, isDirty },
    handleSubmit,
    control,

    watch,
  } = useForm<z.infer<typeof formSchema>>({
    values: {
      address: me?.address || "",
      country: me?.country || "",
      date_of_birth: me?.date_of_birth,
      gender: me?.gender,
      martial_status: me?.martial_status,
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
        router.push("/profile/additional-details");
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

  console.log("🚀 ~ AdditionalDetailsPage ~ watch:", watch());

  return (
    <form onSubmit={onSubmit}>
      <VStack gap={8} className="max-w-xl">
        <ProfileFormItem label="Home address" required>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Textarea
                aria-label="Home address"
                maxRows={2}
                name={field.name}
                onBlur={field.onBlur}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                }}
              />
            )}
          />
        </ProfileFormItem>
        <ProfileFormItem label="Country" required>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select.Root
                aria-label="Country"
                selectionMode="single"
                placeholder="E.g. United States"
                {...{ selectedKeys: field.value ? [field.value] : undefined }}
                {...field}
              >
                <Select.Item key="United States">United States</Select.Item>
                <Select.Item key="Singapore">Singapore</Select.Item>
                <Select.Item key="Indonesia">Indonesia</Select.Item>
              </Select.Root>
            )}
          />
        </ProfileFormItem>
        <ProfileFormItem label="Date of birth">
          <Controller
            name="date_of_birth"
            control={control}
            render={({ field }) => (
              <Datepicker
                aria-label="Date of birth"
                name={field.name}
                disabled={field.disabled}
                value={field.value ? parseDate(tz(field.value).format("YYYY-MM-DD")) : undefined}
                onChange={(value) => {
                  field.onChange(value?.toDate(getLocalTimeZone()).toISOString());
                }}
              />
            )}
          />
        </ProfileFormItem>
        <ProfileFormItem label="Gender">
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select.Root
                aria-label="Gender"
                selectionMode="single"
                placeholder="E.g. Male"
                {...{ selectedKeys: field.value ? [field.value] : undefined }}
                {...field}
              >
                <Select.Item key="Male">Male</Select.Item>
                <Select.Item key="Female">Female</Select.Item>
                <Select.Item key="Others">Others</Select.Item>
              </Select.Root>
            )}
          />
        </ProfileFormItem>
        <ProfileFormItem label="Martial status">
          <Controller
            name="martial_status"
            control={control}
            render={({ field }) => (
              <Select.Root
                aria-label="Martial Status"
                selectionMode="single"
                placeholder="E.g. Single"
                {...{ selectedKeys: field.value ? [field.value] : undefined }}
                {...field}
              >
                <Select.Item key="Single">Single</Select.Item>
                <Select.Item key="Married">Married</Select.Item>
              </Select.Root>
            )}
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
