import React from "react";
import "./TopStrip.css";

const SERVICES = [
  "Estrategia digital",
  "Diseño web",
  "Desarrollo a medida",
  "Experiencias claras",
];

export default function TopStrip() {
  return (
    <div className="topStrip" role="region" aria-label="Servicios de Nuvem">
      <div className="topStrip__viewport">
        <div className="topStrip__track" aria-hidden="true">
          {SERVICES.concat(SERVICES).map((service, index) => (
            <span key={index} className="topStrip__item">
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
