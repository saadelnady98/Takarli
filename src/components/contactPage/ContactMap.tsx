"use client";

import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import { ContactResponse } from "./types";
import { useTranslations } from "next-intl";

const DynamicMap = dynamic(() => import("./dynamic-map"), {
  ssr: false,
  loading: () => (
    <div className="relative flex items-center justify-center w-full h-[400px] overflow-hidden rounded-2xl bg-gray-100">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default function ContactMap({ data }: { data: ContactResponse }) {
  const t = useTranslations("contact.map");
  const location = data?.Social?.location;
  const address = data?.Social?.address?.text;

  const position: LatLngExpression | null =
    location && location.lat && location.long
      ? [location.lat, location.long]
      : null;

  return (
    <section className="w-full  mb-10">
      <h3 className="text-dark lg:text-3xl text-xl  mb-4">
        {t("title")}
      </h3>
      <p className="text-dark-grey lg:text-xl text-sm mb-6">
        {t("description")}
      </p>

      <DynamicMap position={position} />

      <p className="text-center text-gray-600 mt-4">
        {address || t("address")}
      </p>
    </section>
  );
}
