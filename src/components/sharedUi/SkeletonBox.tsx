import React from "react";
import clsx from "clsx";

export default function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-lg bg-[#e5e7eb]",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
        className
      )}
    />
  );
}
