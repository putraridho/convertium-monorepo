"use client";

import { TOKEN_KEY } from "@convertium/constants";
import { getQueryClient, useMeQuery, useTokenQuery } from "@convertium/queries";
import { User } from "@convertium/types";
import { getToken, removeRefreshToken, removeToken } from "@convertium/utils";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo } from "react";

type AuthGuardContext = {
  token: string | undefined | null;
  me: User | undefined | null;
  isMeLoading: boolean;
  logout: () => Promise<void>;
};

export type AuthGuardProps = {
  user?: User | null;
};

export const AuthGuardContext = createContext<AuthGuardContext>({
  token: getToken()?.toString() ?? null,
  me: null,
  isMeLoading: false,
  logout: () => Promise.resolve(),
});

export const useAuthGuard = () => useContext(AuthGuardContext);

export const useUser = () => {
  const { me } = useAuthGuard();

  return me;
};

function AuthGuardProvider({ children, user }: PropsWithChildren<AuthGuardProps>) {
  const {
    data: me,
    isLoading: isMeLoading,
    error,
  } = useMeQuery({
    ...(user ? { initialData: user } : {}),
  });
  const { data: token } = useTokenQuery();

  const logout = useCallback(async () => {
    removeToken();
    removeRefreshToken();
    const queryClient = getQueryClient();
    await queryClient.invalidateQueries({ queryKey: [TOKEN_KEY] });
    queryClient.removeQueries();
  }, []);

  useEffect(() => {
    if (Boolean(error)) {
      console.error("error", error);
      logout();
      return;
    }
  }, [error, logout]);

  const value = useMemo(
    () => ({
      token,
      me: me ?? null,
      isMeLoading,
      logout,
    }),
    [isMeLoading, logout, me, token],
  );

  return <AuthGuardContext.Provider value={value}>{children}</AuthGuardContext.Provider>;
}

const AuthGuard = {
  Provider: AuthGuardProvider,
};

export default AuthGuard;
