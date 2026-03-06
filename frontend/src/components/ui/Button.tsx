import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  rounded?: "md" | "full";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  rounded = "md",
  loading = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "font-semibold transition focus:outline-none inline-flex items-center justify-center";

  const variants = {
    primary: "bg-[#686df4] text-white hover:bg-[#5a5ff7]",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",

    outline:
      "border border-[#686df4] text-[#686df4] hover:bg-[#686df4] hover:text-white",

    ghost: "text-[#686df4] hover:bg-[#686df4]/10",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  const radius = {
    md: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <button
      disabled={loading}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${radius[rounded]} ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      } ${className}`}
      {...props}
    >
      <span className="flex items-center gap-2">
        {children}

        {loading && (
          <span className="flex gap-1 items-center">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </span>
        )}
      </span>
    </button>
  );
}
