"use server";
//
import apiServiceCall from "./apiServiceCall";

export const getHomeData = async (lang: string, currency: string) => {
  //
  const returnedData = await apiServiceCall({
    method: "GET",
    url: "home",
    headers: { "Accept-Language": lang, currency: currency },
  });
  return returnedData;
};

export const getAboutData = async (lang: string, currency: string) => {
  //
  const returnedData = await apiServiceCall({
    method: "GET",
    url: "about",
    headers: { "Accept-Language": lang, currency: currency },
  });
  return returnedData;
};
