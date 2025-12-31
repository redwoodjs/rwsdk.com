import React from "react";
import Constants from "src/lib/Constants";

interface ButtonProps {
  className?: string;
  size?: "small" | "medium" | "large";
  href?: string;
  children?: string;
}

export const Button: React.FC<ButtonProps> = ({
  className = "",
  size = "medium",
  href,
  children,
}) => {
  const sizeClasses = {
    small: "text-[14px] px-3 py-1",
    medium:
      "text-[16px] sm:text-[18px] md:text-[16px] px-4 sm:px-3 md:px-8 py-1",
    large:
      "text-[18px] sm:text-[20px] md:text-[24px] px-4 sm:px-6 md:px-8 py-1",
  };

  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={href || Constants.DOCS_QUICKSTART_URL}
      className={`inline-block !no-underline ${sizeClasses[size]} bg-[#E0E0E0] border-2 border-t-white border-l-white border-r-[#A0A0A0] border-b-[#A0A0A0] rounded-[4px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),inset_0_-1px_0_0_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.1)] hover:bg-[#D0D0D0] active:border-t-[#A0A0A0] active:border-l-[#A0A0A0] active:border-r-white active:border-b-white active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] transition-all ${className}`}
    >
      {children}
    </a>
  );
};
