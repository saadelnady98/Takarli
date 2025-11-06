import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const DEFAULT_TIMEOUT = 50_000;
const isBrowser = typeof window !== "undefined";

/** Read cookie safely on both client/server */
export async function getCookieValue(name: string): Promise<string | null> {
  if (isBrowser) {
    const match = document.cookie.match(
      new RegExp(
        "(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
      )
    );
    return match ? decodeURIComponent(match[1]) : null;
  } else {
    try {
      const { cookies } = await import("next/headers");
      return (await cookies()).get(name)?.value ?? null;
    } catch {
      return null;
    }
  }
}

/** Sync cookie getter for browser only */
function getCookieValueSync(name: string): string | null {
  if (!isBrowser) return null;
  const match = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export class APIClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: DEFAULT_TIMEOUT,
    });

    this.axiosInstance.interceptors.request.use(
      async (config) => {
        let lang = "en";
        let curr = "USD";

        if (isBrowser) {
          lang = getCookieValueSync("language") ?? lang;
          curr = getCookieValueSync("currency") ?? curr;
        } else {
          lang = (await getCookieValue("language")) ?? lang;
          curr = (await getCookieValue("currency")) ?? curr;
        }

        (config.headers as Record<string, string>) = {
          ...(config.headers as Record<string, string>),
          "Accept-Language": lang,
          currency: curr,
        };

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (res) => res,
      (error: AxiosError) => Promise.reject(error)
    );
  }

  public get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const isFormData = data instanceof FormData;
    const headers = {
      ...config?.headers,
      ...(!isFormData && { "Content-Type": "application/json" }),
    };
    return this.axiosInstance.post<T>(url, data, { ...config, headers });
  }

  public put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const isFormData = data instanceof FormData;
    const headers = {
      ...config?.headers,
      ...(!isFormData && { "Content-Type": "application/json" }),
    };
    return this.axiosInstance.put<T>(url, data, { ...config, headers });
  }

  public patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const isFormData = data instanceof FormData;
    const headers = {
      ...config?.headers,
      ...(!isFormData && { "Content-Type": "application/json" }),
    };
    return this.axiosInstance.patch<T>(url, data, { ...config, headers });
  }

  public delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}

// ✅ خليك محافظ عليهم زي ما هما:
export const serverApiClient = new APIClient(
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://dashboard.takarli.tetane.com/api"
);

export const clientApiClient = new APIClient(
  process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL ?? "http://localhost:3000/api"
);
