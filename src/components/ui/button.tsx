import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const baseStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--space-2)",
  fontFamily: "var(--font-sans)",
  fontWeight: 500,
  letterSpacing: "0.02em",
  borderRadius: "var(--radius-lg)",
  transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
  whiteSpace: "nowrap",
  userSelect: "none",
  cursor: "pointer",
  border: "none",
  outline: "none",
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))",
    color: "var(--color-black)",
    boxShadow: "0 0 20px rgba(200, 165, 90, 0.2)",
  },
  secondary: {
    background: "transparent",
    color: "var(--color-white)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
  },
  ghost: {
    background: "transparent",
    color: "var(--color-mist)",
  },
  outline: {
    background: "transparent",
    color: "var(--color-accent)",
    border: "1px solid var(--color-accent)",
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    padding: "var(--space-2) var(--space-4)",
    fontSize: "var(--text-xs)",
  },
  md: {
    padding: "var(--space-3) var(--space-6)",
    fontSize: "var(--text-sm)",
  },
  lg: {
    padding: "var(--space-4) var(--space-8)",
    fontSize: "var(--text-base)",
    borderRadius: "var(--radius-xl)",
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", style, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        style={{
          ...baseStyle,
          ...variantStyles[variant],
          ...sizeStyles[size],
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
