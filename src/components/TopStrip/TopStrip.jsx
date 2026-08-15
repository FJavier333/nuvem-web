import React from "react";
import "./TopStrip.css";

const SERVICES = [
  "SITIOS WEB INFORMATIVOS",
  "SITIOS WEB DINAMICOS",
  "CMS",
  "PORTAFOLIOS EN LINEA",
  "TIENDAS EN LINEA",
  "MICROSITIOS",
  "BLOGS",
  "AUTOMATIZACIONES CON IA",
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