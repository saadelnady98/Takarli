import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ContactInfoItemProps {
  icon: string;
  alt: string;
  text: string;
  link?: string;
}

export function ContactInfoItem({ icon, alt, text ,link}: ContactInfoItemProps) {
  return (
    <Link href={link || "/"}  target="_blank" className="flex items-center lg:gap-3 gap-1 flex-wrap group max-sm:mx-auto ">
      <div className="border border-[#D2D2D2] rounded-full lg:p-2.5 p-1 flex items-center justify-center">
        <Image src={icon} alt={alt} width={28} height={28}
          className="max-lg:w-2.5 max-lg:h-2.5"
        />
      </div>
      <p className="text-dark lg:text-lg text-sm group-hover:text-dark/70 transition-colors">{text}</p>
    </Link>
  );
}
