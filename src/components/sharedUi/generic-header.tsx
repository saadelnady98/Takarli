"use client";

import Image from "next/image";

interface GenericHeaderProps {
  title: string;
  span: string;
  image: string;
  altText: string;
  darkOverlay?: boolean;
}

export default function GenericHeader({ title, span, image, altText, darkOverlay }: GenericHeaderProps) {
  return (
    <section className="relative w-full h-auto overflow-hidden">
      <div className="relative flex items-center justify-center w-full">
        <div className="relative w-full h-[250px] sm:h-[320px] md:h-[400px] lg:h-[284px]">
          <Image
            src={image}
            alt={altText}
            fill
            priority
            className="object-cover"
          />
        {darkOverlay &&  <div className="absolute inset-0 bg-black/70 " />}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-5 py-1.5 mb-3">
            <p className="text-white text-sm sm:text-base font-sans font-semibold tracking-wide">
              {span}
            </p>
          </div>

          <h1 className="text-white font-[galleds]  text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}