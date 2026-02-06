// src/components/GrainSection/GrainSection.jsx
import "./GrainSection.css";

export default function GrainSection({ className = "", children, variant = "light" }) {
  return (
    <div className={`grainSection grainSection--${variant} ${className}`}>
      {children}
    </div>
  );
}
