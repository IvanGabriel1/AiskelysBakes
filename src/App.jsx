import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import BodyContacto from "./components/BodyContacto/BodyContacto";
import BodyInicio from "./components/BodyInicio/BodyInicio";

function App() {
  return (
    <>
      <HashRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<BodyInicio />} />
          <Route path="/nosotros" element={<h1>Hola Nosotros</h1>} />
          <Route path="/productos" element={<h1>Hola Productos</h1>} />
          <Route path="/contacto" element={<BodyContacto />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;
