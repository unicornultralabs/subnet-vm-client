import { useCallback, useMemo } from "react";
import { baseApi } from "../services/api";
import { API_ENDPOINTS } from "../config/api";
import { APIParams, APIResponse } from "../services/api/types";
import useAuthStore from "../store/auth/store";


export const useBaseApi = () => {
  const { credentials } = useAuthStore();
  const bearerToken = credentials?.accessToken;

  const authHeader = useCallback(
    (accessToken?: string) => ({
      headers: { Authorization: `Bearer ${accessToken || bearerToken}` },
    }),
    [bearerToken]
  );

  return useMemo(() => {
    return {
      login: (params: APIParams.Login): Promise<APIResponse.Login> =>
          baseApi.post(API_ENDPOINTS.LOGIN, params),

    };
  }, []);
};
