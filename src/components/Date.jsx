import React from "react";

function toDate(value) {
  if (!value) return null;
  if (typeof value !== "string" && "seconds" in value && "nanoseconds" in value)
    return new Date(value.seconds * 1000);
  if (typeof value === "string") return new Date(value);
  return value;
}

function formatDate(value, options = {}) {
  if (Object.keys(options).length === 0) {
    options = { year: "numeric", month: "2-digit", day: "2-digit" };
  }

  return value.toLocaleDateString("de-DE", options);
}

export default function FormattedDate({ value, ...options }) {
  value = toDate(value);
  if (!value) return null;
  const formatted = formatDate(value, options);
  return <time>{formatted}</time>;
}
