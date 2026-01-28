/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestInit } from "next/dist/server/web/spec-extension/request";

import { ApiError, FetchError, UnexpectedError } from "@/types/error";

interface FetchOptions extends Omit<RequestInit, "body"> {
  response?: boolean;
  body?: unknown | FormData;
  baseURL?: string;
}

export async function fetchApi(
  resource: string,
  options?: FetchOptions,
): Promise<any | Response> {
  try {
    const headers = new Headers(options?.headers);

    let body;
    if (options?.body) {
      if (options.body instanceof FormData) {
        body = options.body; // FormData can be used directly
      } else {
        headers.set("content-type", "application/json");
        body = JSON.stringify(options.body);
      }
    }

    const baseURL = options?.baseURL || `${process.env.NEXT_PUBLIC_API_URL}`;
    const url = `${baseURL}${resource}`;

    const requestOptions: RequestInit = {
      ...options,
      headers,
      body,
      next: {
        revalidate: 3600, // Revalidate every hour
        ...options?.next,
      },
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      if (options?.response) return response;

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        try {
          const json = await response.json();
          return json.data ?? json;
        } catch {
          return "Ok";
        }
      } else {
        return await response.text();
      }
    }
    throw new FetchError("Bad fetch response", response);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      let data;

      try {
        data = await error.response.json();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("UnexpectedError:", error);
        throw new UnexpectedError(error);
      }

      // eslint-disable-next-line no-console
      console.log("ResponseError:", data);

      const { code, errors, message, path, statusCode, timestamp } = data;
      throw new ApiError(message, statusCode, timestamp, path, code, errors);
    } else {
      // eslint-disable-next-line no-console
      console.error("UnexpectedError:", error);
      throw new UnexpectedError(error);
    }
  }
}
