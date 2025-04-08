import { API } from "@convertium/services";
import { User } from "@convertium/types";
import { QueryKey, UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { useTokenQuery } from "../token-query";

export function useMeQuery(options?: Partial<UndefinedInitialDataOptions<User, Error, User, QueryKey>>) {
  const { data: token } = useTokenQuery();

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => API.getOrCreateInstance().user().me(),
    enabled: !!token,
    ...(options || {}),
  });
}
