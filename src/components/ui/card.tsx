import React from "react";

/* ── Inline Styles ── */
const cardStyles: Record<string, React.CSSProperties> = {
  root: {
    background: "var(--color-charcoal)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "var(--radius-xl)",
    overflow: "hidden",
    transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-2)",
    padding: "var(--space-6) var(--space-6) 0",
  },
  title: {
    fontFamily: "var(--font-serif)",
    fontSize: "var(--text-xl)",
    fontWeight: 600,
    lineHeight: 1.3,
    color: "var(--color-white)",
    letterSpacing: "-0.01em",
  },
  description: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-silver)",
    lineHeight: 1.6,
  },
  content: {
    padding: "var(--space-6)",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    padding: "0 var(--space-6) var(--space-6)",
    gap: "var(--space-3)",
  },
};

/* ── Card Components ── */
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <div ref={ref} style={{ ...cardStyles.root, ...style }} {...props} />
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <div ref={ref} style={{ ...cardStyles.header, ...style }} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ style, ...props }, ref) => (
  <h3 ref={ref} style={{ ...cardStyles.title, ...style }} {...props} />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ style, ...props }, ref) => (
  <p ref={ref} style={{ ...cardStyles.description, ...style }} {...props} />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <div ref={ref} style={{ ...cardStyles.content, ...style }} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <div ref={ref} style={{ ...cardStyles.footer, ...style }} {...props} />
));
CardFooter.displayName = "CardFooter";
