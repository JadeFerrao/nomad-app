"use client";

import React, { createContext, useContext, useState } from "react";

/* ── Context ── */
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (val: string) => void;
}
const TabsContext = createContext<TabsContextValue>({
  activeTab: "",
  setActiveTab: () => {},
});

/* ── Styles ── */
const tabsStyles: Record<string, React.CSSProperties> = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-4)",
    width: "100%",
  },
  list: {
    display: "flex",
    gap: "var(--space-1)",
    background: "rgba(255, 255, 255, 0.03)",
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-1)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
  },
  trigger: {
    flex: 1,
    padding: "var(--space-3) var(--space-4)",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
    border: "none",
    outline: "none",
    textAlign: "center" as const,
    whiteSpace: "nowrap" as const,
  },
  triggerActive: {
    background: "var(--color-accent)",
    color: "var(--color-black)",
    boxShadow: "0 0 16px rgba(200, 165, 90, 0.2)",
  },
  triggerInactive: {
    background: "transparent",
    color: "var(--color-silver)",
  },
  content: {},
};

/* ── Components ── */
interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  onValueChange?: (val: string) => void;
  style?: React.CSSProperties;
}

export function Tabs({ defaultValue, children, onValueChange, style }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleChange = (val: string) => {
    setActiveTab(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleChange }}>
      <div style={{ ...tabsStyles.root, ...style }}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return <div style={{ ...tabsStyles.list, ...style }}>{children}</div>;
}

export function TabsTrigger({
  value,
  children,
  style,
}: {
  value: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      style={{
        ...tabsStyles.trigger,
        ...(isActive ? tabsStyles.triggerActive : tabsStyles.triggerInactive),
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  style,
}: {
  value: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;

  return <div style={{ ...tabsStyles.content, ...style }}>{children}</div>;
}
