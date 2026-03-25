import { skeleton, skeletonText } from "./Skeleton.css";

export const Skeleton = ({
  height,
  width,
}: {
  height: number | string;
  width: number | string;
}) => {
  return <div style={{ height, width }} className={skeleton} />;
};

export const SkeletonText = ({ text }: { text: string }) => {
  return <div className={skeletonText}>{text}</div>;
};

Skeleton.displayName = "Skeleton";
SkeletonText.displayName = "SkeletonText";
