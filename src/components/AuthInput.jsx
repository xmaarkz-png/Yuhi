import React from "react";

export default function AuthInput({ id, label, type = "text", name, value, onChange, placeholder, autoComplete, required }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id || name} className="text-xs" style={{ color: "#6B8190" }}>
          {label}
        </label>
      )}
      <input
        id={id || name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full auth-input"
      />
    </div>
  );
}
