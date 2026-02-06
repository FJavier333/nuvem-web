import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import QuienesSomos from "./pages/QuienesSomos/QuienesSomos";
import ComoTrabajamos from "./pages/ComoTrabajamos/ComoTrabajamos";
import Politica from "./pages/Politica/Politica";
import Terminos from "./pages/Terminos/Terminos";
import Privacidad from "./pages/Privacidad/Privacidad";

export default function App() {
  return (
    <BrowserRouter>
      {/* 👇 AQUÍ */}
      <ScrollToTop />

      <Routes>
        {/* Layout global */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/como-trabajamos" element={<ComoTrabajamos />} />
          <Route path="/politica" element={<Politica />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/privacidad" element={<Privacidad />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}