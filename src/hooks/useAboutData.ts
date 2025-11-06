"use client";
import { useEffect, useState } from "react";
import { getAboutData } from "@/lib/serverAction";

export default function useAboutData(locale: string, currency: string) {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAboutData(locale, currency);
        setData(result);
      } catch (err: unknown) {
        console.error("❌ Error fetching home data:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [locale, currency]);

  return { data, loading, error };
}
