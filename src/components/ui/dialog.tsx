"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dialogStyles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: "var(--space-6)",
  },
  content: {
    background: "var(--color-charcoal)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "var(--radius-2xl)",
    padding: "var(--space-8)",
    maxWidth: 560,
    width: "100%",
    maxHeight: "85vh",
    overflow: "auto",
    position: "relative",
  },
  close: {
    position: "absolute",
    top: "var(--space-4)",
    right: "var(--space-4)",
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "var(--radius-md)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "var(--color-silver)",
    cursor: "pointer",
    fontSize: "var(--text-lg)",
    transition: "all 200ms ease",
    border: "none",
  },
  title: {
    fontFamily: "var(--font-serif)",
    fontSize: "var(--text-2xl)",
    fontWeight: 600,
    color: "var(--color-white)",
    marginBottom: "var(--space-2)",
  },
  description: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-silver)",
    marginBottom: "var(--space-6)",
    lineHeight: 1.6,
  },
};

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    },
    [onOpenChange]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          style={dialogStyles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            style={dialogStyles.content}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={dialogStyles.close}
              onClick={() => onOpenChange(false)}
              aria-label="Close dialog"
            >
              ✕
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DialogTitle({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return <h2 style={{ ...dialogStyles.title, ...style }}>{children}</h2>;
}

export function DialogDescription({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return <p style={{ ...dialogStyles.description, ...style }}>{children}</p>;
}
