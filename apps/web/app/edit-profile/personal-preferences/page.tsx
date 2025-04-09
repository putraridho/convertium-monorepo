/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ProfileFormItem } from "@/modules/profile";
import { useUser } from "@/providers";
import { getQueryClient } from "@convertium/queries";
import { API } from "@convertium/services";
import { Button, HStack, Select, toast, VStack } from "@convertium/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  hobbies: z.array(z.string()).optional(),
  sports: z.array(z.string()).optional(),
  music_genres: z.array(z.string()).optional(),
  movies: z.array(z.string()).optional(),
});
export default function PersonalPreferencesPage() {
  const router = useRouter();
  const me = useUser();

  const {
    reset,
    formState: { isSubmitting },
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    values: {
      hobbies: me?.hobbies,
      sports: me?.sports,
      music_genres: me?.music_genres,
      movies: me?.movies,
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
        router.push("/profile/personal-preferences");
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
        <ProfileFormItem label="Hobbies and interest">
          <Controller
            name="hobbies"
            control={control}
            render={() => (
              <Select.Root
                aria-label="Hobbies and interest"
                selectionMode="multiple"
                placeholder="E.g. Hobby 1"
                selectedKeys={watch("hobbies")}
                onChange={(keys) => {
                  setValue("hobbies", keys.target.value.split(",").filter(Boolean));
                }}
              >
                <Select.Item key="Hobby 1">Hobby 1</Select.Item>
                <Select.Item key="Hobby 2">Hobby 2</Select.Item>
                <Select.Item key="Hobby 3">Hobby 3</Select.Item>
                <Select.Item key="Hobby 4">Hobby 4</Select.Item>
                <Select.Item key="Hobby 5">Hobby 5</Select.Item>
                <Select.Item key="Hobby 6">Hobby 6</Select.Item>
                <Select.Item key="Hobby 7">Hobby 7</Select.Item>
                <Select.Item key="Hobby 8">Hobby 8</Select.Item>
                <Select.Item key="Hobby 9">Hobby 9</Select.Item>
                <Select.Item key="Hobby 10">Hobby 10</Select.Item>
              </Select.Root>
            )}
          />
        </ProfileFormItem>
        <ProfileFormItem label="Favorite sport(s)">
          <Controller
            name="sports"
            control={control}
            render={() => (
              <Select.Root
                aria-label="Favorite sport(s)"
                selectionMode="multiple"
                placeholder="E.g. Sport 1"
                selectedKeys={watch("sports")}
                onChange={(keys) => {
                  setValue("sports", keys.target.value.split(",").filter(Boolean));
                }}
              >
                <Select.Item key="Sport 1">Sport 1</Select.Item>
                <Select.Item key="Sport 2">Sport 2</Select.Item>
                <Select.Item key="Sport 3">Sport 3</Select.Item>
                <Select.Item key="Sport 4">Sport 4</Select.Item>
                <Select.Item key="Sport 5">Sport 5</Select.Item>
                <Select.Item key="Sport 6">Sport 6</Select.Item>
                <Select.Item key="Sport 7">Sport 7</Select.Item>
                <Select.Item key="Sport 8">Sport 8</Select.Item>
                <Select.Item key="Sport 9">Sport 9</Select.Item>
                <Select.Item key="Sport 10">Sport 10</Select.Item>
              </Select.Root>
            )}
          />
        </ProfileFormItem>
        <ProfileFormItem label="Preferred music genre(s)">
          <Controller
            name="music_genres"
            control={control}
            render={() => (
              <Select.Root
                aria-label="Preferred music genre(s)"
                selectionMode="multiple"
                placeholder="E.g. Genre 1"
                selectedKeys={watch("music_genres")}
                onChange={(keys) => {
                  setValue("music_genres", keys.target.value.split(",").filter(Boolean));
                }}
              >
                <Select.Item key="Genre 1">Genre 1</Select.Item>
                <Select.Item key="Genre 2">Genre 2</Select.Item>
                <Select.Item key="Genre 3">Genre 3</Select.Item>
                <Select.Item key="Genre 4">Genre 4</Select.Item>
                <Select.Item key="Genre 5">Genre 5</Select.Item>
                <Select.Item key="Genre 6">Genre 6</Select.Item>
                <Select.Item key="Genre 7">Genre 7</Select.Item>
                <Select.Item key="Genre 8">Genre 8</Select.Item>
                <Select.Item key="Genre 9">Genre 9</Select.Item>
                <Select.Item key="Genre 10">Genre 10</Select.Item>
              </Select.Root>
            )}
          />
        </ProfileFormItem>
        <ProfileFormItem label="Preferred movie/TV show(s)">
          <Controller
            name="movies"
            control={control}
            render={() => (
              <Select.Root
                aria-label="Preferred movie/TV show(s)"
                selectionMode="multiple"
                placeholder="E.g. Genre 1"
                selectedKeys={watch("movies")}
                onChange={(keys) => {
                  setValue("movies", keys.target.value.split(",").filter(Boolean));
                }}
              >
                <Select.Item key="Movie 1">Movie 1</Select.Item>
                <Select.Item key="Movie 2">Movie 2</Select.Item>
                <Select.Item key="Movie 3">Movie 3</Select.Item>
                <Select.Item key="Movie 4">Movie 4</Select.Item>
                <Select.Item key="Movie 5">Movie 5</Select.Item>
                <Select.Item key="Movie 6">Movie 6</Select.Item>
                <Select.Item key="Movie 7">Movie 7</Select.Item>
                <Select.Item key="Movie 8">Movie 8</Select.Item>
                <Select.Item key="Movie 9">Movie 9</Select.Item>
                <Select.Item key="Movie 10">Movie 10</Select.Item>
              </Select.Root>
            )}
          />
        </ProfileFormItem>
        <HStack gap={4} className="justify-end">
          <Button type="reset" variant="light" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Submit
          </Button>
        </HStack>
      </VStack>
    </form>
  );
}
