import { TitleProps, ParagraphProps, BadgeProps, BtnProps } from "../types/interfaceData";

export const Diviging = ({ className }: { className?: string }) => {
  return <span className={`border-border w-full border-b-[0.0625rem] ${className}`}></span>;
};

export const Title = ({ children, className }: TitleProps) => {
  return <h2 className={`text-dark font-[galleds] lg:text-3xl text-xl ${className ?? ""}`}>{children}</h2>;
};

export const Paragraph = ({ children, className }: ParagraphProps) => {
  return <p className={`text-dark-grey text-[1.25rem] font-light ${className ?? ""}`}>{children}</p>;
};

export const Badge = ({ children, className, onClick }: BadgeProps) => {
  return (
    <div
      onClick={onClick}
      className={`bg-badge flex h-12 w-[235px] items-center justify-center rounded-4xl ${className ?? ""}`}
    >
      {children}
    </div>
  );
};
<div className="h-"></div>
export const Btn = ({ children, className, onClick, disabled }: BtnProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex h-[2.938rem] w-[10.813rem] cursor-pointer items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
};

export const H2Title = ({ children, className }: TitleProps) => {
  return <h2 className={`font-[galleds]  ${className??""}`}>{children}</h2>;
};
export const PParagraph = ({ children, className }: ParagraphProps) => {
  return <p className={`text-dark-grey  ${className??""}`}>{children}</p>;
};