import { API } from "@convertium/services";
import { User } from "@convertium/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { getQueryClient } from "../query-client";

export function useUserMutation(options?: UseMutationOptions<void, Error, Partial<Omit<User, "id" | "user_id">>>) {
  return useMutation({
    mutationKey: ["user"],
    mutationFn: async (payload) => API.getOrCreateInstance().user().update(payload),
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    ...(options || {}),
  });
}
