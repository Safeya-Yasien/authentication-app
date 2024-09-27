import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Define the type for your API response
interface ApiResponse {
  accessToken: string;
}

// Define a type for your error response
interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

// Create a base query function
const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Create a base query function with re-authentication
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data as ApiResponse;
      Cookies.set("accessToken", accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error) {
        // Type assertion to your ApiError interface
        const errorData = refreshResult.error as ApiError;
        if (errorData.status === 403) {
          errorData.data.message = "Your login has expired.";
        }
      }
      return refreshResult;
    }
  }
  return result;
};

// Create the API slice
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
