import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import BodyContacto from "./components/BodyContacto/BodyContacto";
import BodyInicio from "./components/BodyInicio/BodyInicio";
import BodyNosotros from "./components/BodyNosotros/BodyNosotros";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
  return (
    <>
      <HashRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<BodyInicio />} />
          <Route path="/nosotros" element={<BodyNosotros />} />
          <Route path="/productos" element={<h1>Hola Productos</h1>} />
          <Route path="/contacto" element={<BodyContacto />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;
