import { useMemo } from "react";
import {
  useMutation,
  useQueryClient,
  type QueryKey,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { removeEmptyQueryParams } from "@/lib/utils";

type HttpMethod = "POST" | "PUT" | "PATCH" | "DELETE" | "GET";

type SubmitParams<TBody = unknown> = {
  urlPath: string;
  body?: TBody;
};

type CacheActions<TData> = {
  invalidate?: QueryKey[];
  refetch?: QueryKey[];
  remove?: QueryKey[];
  update?: Array<{
    queryKey: QueryKey;
    updater: (oldData: unknown, result: TData) => unknown;
  }>;
};

type UseMutateRequestParams<TData, TBody, TError> = {
  method?: HttpMethod;
  config?: AxiosRequestConfig;
  cache?: CacheActions<TData>;
  showSuccessToast?: boolean;
  successMessage?: string | ((data: TData) => string);
  errorMessage?: string | ((err: TError) => string);
  mutationOptions?: Omit<
    UseMutationOptions<TData, TError, SubmitParams<TBody>>,
    "mutationFn"
  >;
};

function defaultSuccessMessage(method: HttpMethod) {
  switch (method) {
    case "POST": return "Successfully submitted";
    case "PUT":
    case "PATCH": return "Successfully updated";
    case "DELETE": return "Successfully deleted";
    default: return "Success";
  }
}

function extractAxiosMessage(err: unknown) {
  const e = err as AxiosError<{ message?: string }>;
  return (
    e?.response?.data?.message ||
    e?.message ||
    "Something went wrong"
  );
}

export default function useMutateRequest<
  TData = unknown,
  TBody = unknown,
  TError = AxiosError
>({
  method = "POST",
  config,
  cache,
  showSuccessToast = true,
  successMessage,
  errorMessage,
  mutationOptions,
}: UseMutateRequestParams<TData, TBody, TError> = {}): UseMutationResult<
  TData,
  TError,
  SubmitParams<TBody>
> {
  const queryClient = useQueryClient();

  const mergedConfig = useMemo<AxiosRequestConfig>(() => ({
    ...config,
  }), [config]);

  // Extract onSuccess and onError from mutationOptions if they exist
  const { onSuccess, onError, ...restMutationOptions } = mutationOptions || {};

  const userOnSuccess =
    onSuccess as
      | ((
          data: TData,
          variables: SubmitParams<TBody>,
          context: unknown
        ) => void | Promise<void>)
      | undefined;

  const userOnError =
    onError as
      | ((
          error: TError,
          variables: SubmitParams<TBody>,
          context: unknown
        ) => void | Promise<void>)
      | undefined;

  return useMutation<TData, TError, SubmitParams<TBody>>({
    ...restMutationOptions,
    mutationFn: async ({ urlPath, body }) => {
      const cleanedUrl = removeEmptyQueryParams(urlPath);
      const res = await axios.request<TData>({
        url: cleanedUrl,
        method,
        data: body,
        ...mergedConfig,
      });
      return res.data;
    },

    onSuccess: async (data, variables, ctx) => {
      // 1. Hook Internal Success Logic
      if (showSuccessToast) {
        const msg =
          typeof successMessage === "function"
            ? successMessage(data)
            : successMessage ||
              (data as { message?: string } | undefined)?.message ||
              defaultSuccessMessage(method);
        toast.success(msg);
      }

      cache?.invalidate?.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
      cache?.refetch?.forEach((key) => queryClient.refetchQueries({ queryKey: key }));
      cache?.remove?.forEach((key) => queryClient.removeQueries({ queryKey: key }));
      cache?.update?.forEach(({ queryKey, updater }) => {
        queryClient.setQueryData(queryKey, (oldData: unknown) => updater(oldData, data));
      });

      // 2. User Provided Callback
      userOnSuccess?.(data, variables, ctx);
    },

    onError: (err, variables, ctx) => {
      // 1. Hook Internal Error Logic
      const msg = typeof errorMessage === "function"
        ? errorMessage(err)
        : errorMessage || extractAxiosMessage(err);
      toast.error(msg);

      // 2. User Provided Callback
      userOnError?.(err, variables, ctx);
    },
  });
}
