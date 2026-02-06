import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Reveal from "../../components/Reveal/Reveal";

import Hero from "../../sections/Hero/Hero";
import IntroCTA from "../../sections/IntroCTA/IntroCTA";
import Servicios from "../../sections/Servicios/Servicios";
import Portafolio from "../../sections/Portafolio/Portafolio";
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
      <Reveal as="section"><Hero /></Reveal>
      <Reveal as="section"><IntroCTA /></Reveal>
      <Reveal as="section"><Servicios /></Reveal>
      <Reveal as="section"><Portafolio /></Reveal>
      <Reveal as="section"><PorQueElegirNuvem /></Reveal>
      <Reveal as="section"><PilaresCarousel /></Reveal>
      <Reveal as="section"><FAQ /></Reveal>
      <Reveal as="section"><ComentarioGlide /></Reveal>
      <Reveal as="section"><FinalCTA /></Reveal>
      <Reveal as="section"><Contacto /></Reveal>
    </>
  );
}