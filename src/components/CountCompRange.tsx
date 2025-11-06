// components/CountCompRange.tsx
"use client";
import CountUp from "react-countup";

interface CountCompRangeProps {
  startValue?: number;
  endValue?: number;
  title?: string;
}

export default function CountCompRange({
  startValue,
  endValue,
  title = "",
 
}: CountCompRangeProps) {
  const hasRange = startValue !== undefined && endValue !== undefined;

  return (
    <div className={`flex flex-col items-center `}>
      <div className="flex items-start gap-1">
        {/* Start Value */}
        {startValue !== undefined && (
          <CountUp
            delay={0.5}
            duration={2}
            start={0}
            end={startValue}
            className={`lg:text-3xl sm:text-lg text-base text-white  font-medium font-[galleds]`}
          />
        )}

        {/* Range Separator */}
        {hasRange && (
          <span className="lg:text-3xl sm:text-lg text-base font-medium mx-1">-</span>
        )}

        {/* End Value */}
        {hasRange && (
          <CountUp
            delay={0.5}
            duration={2}
            start={0}
            end={endValue}
            className={`lg:text-3xl sm:text-lg text-base text-white font-medium font-[galleds]`}
          />
        )}

        {/* Suffix */}
        
          <span className={`lg:text-3xl sm:text-lg text-base font-medium text-white `}>
            +
          </span>
       
      </div>

      {/* Title */}
      {title && (
        <div className={`text-sm lg:text-lg font-light text-white  font-sans `}>
          {title}
        </div>
      )}
    </div>
  );
}