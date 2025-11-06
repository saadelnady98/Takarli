import axios from "axios";

export default async function apiServiceCall({
  url,
  method,
  body,
  headers,
}: {
  url: string;
  method: string;
  body?: string | FormData;
  headers?: Record<string, string>;
}) {
  try {
    const response = await axios({
      method: method?.toUpperCase() || "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      data: body,
      headers: {
        "Content-Type": "application/json",
        ...(headers || {}),
      },
    });
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
