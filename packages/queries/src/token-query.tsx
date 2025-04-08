import { TOKEN_KEY } from "@convertium/constants";
import { getToken } from "@convertium/utils";
import { QueryKey, UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

export function useTokenQuery(
  options?: Partial<UndefinedInitialDataOptions<string | null, Error, string | null, QueryKey>>,
) {
  return useQuery({
    queryKey: [TOKEN_KEY],
    queryFn: () => getToken()?.toString() ?? null,
    ...(options || {}),
  });
}
