import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Hero from "../../sections/Hero/Hero";
import IntroCTA from "../../sections/IntroCTA/IntroCTA";
import Servicios from "../../sections/Servicios/Servicios";
import ProcesoSection from "../../sections/ProcesoSection/ProcesoSection";
import Portafolio from "../../sections/Portafolio/Portafolio";
import NuvemPrinciplesSection from "../../sections/NuvemPrinciplesSection/NuvemPrinciplesSection";
import PorQueElegirNuvem from "../../sections/PorQueElegirNuvem/PorQueElegirNuvem";
import PilaresCarousel from "../../sections/GarantiaSection/PilaresCarousel";
import FAQ from "../../sections/FAQ/FAQ";
import ComentarioGlide from "../../sections/GarantiaSection/ComentarioGlide";
import FinalCTA from "../../sections/FinalCTA/FinalCTA";
import Contacto from "../../sections/Contacto/Contacto";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const id = location.state?.scrollTo;
    if (!id) return;

    // Espera un frame para asegurar que el DOM ya montó
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

      // Limpia el state para que no se repita en recargas
      navigate(".", { replace: true, state: null });
    });
  }, [location.state, navigate]);

  return (
    <>
      <section><Hero /></section>
      <section><IntroCTA /></section>
      <section><Servicios /></section>
      <section><Portafolio /></section>
      <section><ProcesoSection /></section>
      <section><NuvemPrinciplesSection /></section>
      {/*<section><PorQueElegirNuvem /></section>*/}
      {/*<section><PilaresCarousel /></section>*/}
      <section><FAQ /></section>
      <section><ComentarioGlide /></section>
      <section><FinalCTA /></section>
      <section><Contacto /></section>
    </>
  );
}
