import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeEmptyQueryParams(url: string): string {
  try {
    const [baseUrl, query] = url.split("?");
    if (!query) return baseUrl;

    const params = new URLSearchParams(query);
    const filteredParams = new URLSearchParams();

    params.forEach((value, key) => {
      if (value !== "" && value !== "null" && value !== "undefined") {
        filteredParams.append(key, value);
      }
    });

    const queryString = filteredParams.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  } catch {
    return url;
  }
}

