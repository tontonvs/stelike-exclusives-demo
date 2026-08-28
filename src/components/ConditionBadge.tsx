import type { ProductCondition } from "../types";

interface ConditionBadgeProps {
  condition: ProductCondition;
  size?: "sm" | "lg";
}

export default function ConditionBadge({
  condition,
  size = "sm",
}: ConditionBadgeProps) {
  const padding = size === "lg" ? "3px 9px" : "2px 6px";
  const fontSize = size === "lg" ? "0.7rem" : "0.58rem";

  return (
    <span
      style={{
        fontWeight: 700,
        color: "var(--color-text-dark)",
        background: "rgba(255,255,255,0.92)",
        borderRadius: "var(--radius-sm)",
        border: "3px solid var(--color-text-dark)",
        padding,
        fontSize,
      }}
    >
      {condition}
    </span>
  );
}
