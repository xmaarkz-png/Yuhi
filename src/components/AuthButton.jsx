import React from "react";

export default function AuthButton({ children, onClick, type = "button", variant = "primary", className = "" }) {
  const base = `w-full auth-button ${variant === "outline" ? "auth-outline" : "auth-primary"}`;
  return (
    <button type={type} onClick={onClick} className={`${base} ${className}`}>
      {children}
    </button>
  );
}
