import { isServer, QueryClient, QueryClientConfig, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useMemo } from "react";

let browserQueryClient: QueryClient | undefined = undefined;

function makeQueryClient(config?: QueryClientConfig) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        ...(config?.defaultOptions?.queries || {}),
      },

      ...(config?.defaultOptions || {}),
    },
    ...config,
  });

  return client;
}

export function getQueryClient(config?: QueryClientConfig) {
  if (isServer) {
    return makeQueryClient(config);
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient(config);
    return browserQueryClient;
  }
}

function Provider({ children }: React.PropsWithChildren) {
  const queryClient = useMemo(() => getQueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} client={queryClient} />
    </QueryClientProvider>
  );
}

export const Queries = {
  Provider,
};
