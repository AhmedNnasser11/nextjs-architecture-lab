import { useMemo, useCallback } from "react";
import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
import { removeEmptyQueryParams } from "@/lib/utils";

type UseFetchQueryParams<TData, TError = AxiosError> = {
  url: string; // can include ?params
  queryKey?: QueryKey; // optional custom key prefix
  config?: AxiosRequestConfig; // axios config: headers, params, etc.
  queryOptions?: Omit<
    UseQueryOptions<TData, TError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >;
  initialData?: TData | (() => TData);
};

export default function useFetchQuery<TData, TError = AxiosError>({
  url,
  queryKey,
  config,
  queryOptions,
  initialData,
}: UseFetchQueryParams<TData, TError>): UseQueryResult<TData, TError> {
  const router = useRouter();
  const endPointUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  // Build + clean the final URL
  const finalUrl = useMemo(() => {
    // Relative URL handling
    const absoluteBase = endPointUrl || (typeof window !== "undefined" ? window.location.origin : "http://localhost");
    const built = new URL(url, absoluteBase);
    return removeEmptyQueryParams(built.toString());
  }, [url, endPointUrl]);

  // Strong cache key: include full cleaned URL
  const finalQueryKey = useMemo<QueryKey>(() => {
    if (queryKey && queryKey.length) return [...queryKey, finalUrl];
    return ["GET", finalUrl];
  }, [queryKey, finalUrl]);

  const enabled = queryOptions?.enabled ?? true;

  const queryFn = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      const res = await axios.get<TData>(finalUrl, {
        ...config,
        signal,
      });
      return res.data;
    },
    [config, finalUrl]
  );

  const result = useQuery<TData, TError, TData, QueryKey>({
    queryKey: finalQueryKey,
    queryFn,
    enabled,
    retry: false,
    ...(initialData !== undefined ? { initialData } : {}),
    ...queryOptions,
  });

  if (result.error) {
    const error = result.error as unknown as AxiosError | undefined;
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      router.replace("/");
    }
  }

  return result;
}
