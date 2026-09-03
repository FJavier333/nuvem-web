import Header from "../components/Header/Header";
import TopStrip from "../components/TopStrip/TopStrip";
import Footer from "../components/Footer/Footer";
import FooterNew from "../components/FooterNew/FooterNew";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();

  return (
    <>
      <TopStrip />
      <Header />

      {/* 👇 aquí se renderizan las páginas */}
      <div key={location.pathname}>
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
