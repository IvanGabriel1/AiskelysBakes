import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import BodyContacto from "./components/BodyContacto/BodyContacto";
import BodyInicio from "./components/BodyInicio/BodyInicio";
import BodyNosotros from "./components/BodyNosotros/BodyNosotros";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import HeaderSingUp from "./components/HeaderSignUp/HeaderSingUp";
import BodyProductos from "./components/BodyProductos/BodyProductos";
import { AuthProvider } from "./context/AuthContext";
import ProductDetail from "./components/ProductDetail/ProductDetail";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <HeaderSingUp />
        <NavBar />
        <Routes>
          <Route path="/" element={<BodyInicio />} />
          <Route path="/nosotros" element={<BodyNosotros />} />
          <Route path="/productos" element={<BodyProductos />} />
          <Route path="/contacto" element={<BodyContacto />} />
          <Route path="/item/:id" element={<ProductDetail />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/productos/:categoryId" element={<BodyProductos />} />
        </Routes>

        <Footer />
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
