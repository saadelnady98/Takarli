import SkeletonBox from "../sharedUi/SkeletonBox";

export default function HeroPropertySkeleton() {
  return (
    <div className="hidden xl:flex gap-6 pt-8">
      {/* Main large image skeleton */}
      <SkeletonBox className="h-[596px] w-[62%] rounded-2xl" />

      {/* Two stacked smaller image skeletons */}
      <div className="flex flex-col gap-6 w-[38%] h-[596px]">
        <SkeletonBox className="h-[286px] rounded-2xl" />
        <SkeletonBox className="h-[286px] rounded-2xl" />
      </div>
    </div>
  );
}
