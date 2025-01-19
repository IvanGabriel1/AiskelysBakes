import React, { useEffect, useState } from "react";
import "./productdetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../Spinner/Spinner";
import FollowUs from "../FollowUs/FollowUs";
import Carousel from "../Carousel/Carousel";
import QuantityButtons from "../QuantityButtons/QuantityButtons";
import { useSelector } from "react-redux";
import { selectProductQuantity } from "../../redux/cartSlice";
import GoCart from "../GoCart/GoCart";
import svgBackPage from "../../assets/arrow-backPage.svg";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const cantidad = useSelector((state) => selectProductQuantity(state, id));
  const [isMayorista, setIsMayorista] = useState(false);
  const [categoriaMayoristaMessage, setCategoriaMayoristaMessage] =
    useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      // console.log("Fetching product with ID:", id);
      try {
        const productRef = doc(db, "productos", id);
        const response = await getDoc(productRef);

        if (response.exists()) {
          // console.log("Product data:", response.data());
          setProduct({ ...response.data(), id: response.id }); //response.data() solo devuelve los campos del documento, no incluye el id del documento.
        } else {
          console.log("No existe el documento");
        }
      } catch (error) {
        console.log(`Error fetch product`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && product.categoria) {
      const categoriaMinuscula = product.categoria.toLowerCase();

      if (categoriaMinuscula === "alfajor" && cantidad >= 12) {
        setIsMayorista(true);
      } else if (categoriaMinuscula === "bombon" && cantidad >= 36) {
        setIsMayorista(true);
      } else if (categoriaMinuscula === "torta" && cantidad >= 3) {
        setIsMayorista(true);
      } else {
        setIsMayorista(false);
      }
    }
  }, [cantidad]);

  useEffect(() => {
    if (product && product.categoria) {
      const categoriaMinuscula = product.categoria.toLowerCase();

      if (categoriaMinuscula === "alfajor") {
        setCategoriaMayoristaMessage(
          "Agrega 12 unidades o mas para acceder al precio mayorista."
        );
      } else if (categoriaMinuscula === "bombon") {
        setCategoriaMayoristaMessage(
          "Agrega 36 unidades o mas para acceder al precio mayorista."
        );
      } else if (categoriaMinuscula === "torta") {
        setCategoriaMayoristaMessage(
          "Agrega 3 unidades o mas para acceder al precio mayorista."
        );
      }
    }
  }, [product]);

  const navigateBackPage = () => {
    navigate(-1);
  };

  return (
    <div className="item-details-container">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {product ? (
            <>
              <div className="btn-back-container">
                <button className="btn-back-page" onClick={navigateBackPage}>
                  <img src={svgBackPage} alt="volver a la pagina anterior" />
                </button>
              </div>

              <div className="prod-detail-sections-large">
                <Carousel
                  images={[product.img, product.img2, product.img3].filter(
                    Boolean
                  )}
                />

                <div className="prod-detail-info-large">
                  <p className="prod-detail-prod-nombre">{product.nombre}</p>
                  <p className="aviso-productos">
                    <strong>Condiciones para mayoristas: </strong>
                    {categoriaMayoristaMessage}
                  </p>

                  <section className="item-details-description-section">
                    <p>
                      <strong>Descripción:</strong>
                    </p>
                    <p className="item-details-description">
                      {product.descripcion}
                    </p>
                  </section>

                  <GoCart />
                </div>

                <section className="prod-detail-price-section">
                  {product.descuento ? (
                    <p className="prod-detail-price">
                      Precio Minorista: $ <s>{product.precioMinorista}</s> /{" "}
                      {product.precioMinorista -
                        product.precioMinorista *
                          (product.descuento / 100).toFixed(2)}{" "}
                      usd.
                    </p>
                  ) : (
                    <p className="prod-detail-price">
                      Precio Minorista: ${product.precioMinorista} usd.
                    </p>
                  )}

                  {product.descuentoMayorista ? (
                    <p className="prod-detail-price">
                      Precio Mayorista: $ <s>{product.precioMayorista}</s> /{" "}
                      {(
                        product.precioMayorista -
                        product.precioMayorista *
                          (product.descuentoMayorista / 100)
                      ).toFixed(2)}{" "}
                      usd.
                    </p>
                  ) : (
                    <p className="prod-detail-price">
                      Precio Mayorista: ${product.precioMayorista} usd.
                    </p>
                  )}
                  <QuantityButtons
                    id={product.id}
                    nombre={product.nombre}
                    precioMinorista={product.precioMinorista}
                    precioMayorista={product.precioMayorista}
                    cantidad={cantidad}
                    img={product.img}
                    categoria={product.categoria}
                    descuento={product.descuento}
                    descuentoMayorista={product.descuentoMayorista}
                  />
                  {isMayorista ? (
                    <span className="prod-detail-total-container">
                      <strong className="prod-detail-total-precio-mayorista">
                        Mayorista!
                      </strong>
                      <span className="prod-detail-total-precio-final">
                        Total: $
                        {product.descuentoMayorista
                          ? (
                              (product.precioMayorista -
                                product.precioMayorista *
                                  (product.descuentoMayorista / 100)) *
                              cantidad
                            ).toFixed(2)
                          : (product.precioMayorista * cantidad).toFixed(2)}
                      </span>
                    </span>
                  ) : (
                    <span className="prod-detail-total-container">
                      <strong>Minorista</strong>
                      <span className="prod-detail-total-precio-final">
                        Total: $
                        {product.descuento
                          ? (
                              (product.precioMinorista -
                                product.precioMinorista *
                                  (product.descuento / 100)) *
                              cantidad
                            ).toFixed(2)
                          : (product.precioMinorista * cantidad).toFixed(2)}
                      </span>
                    </span>
                  )}
                </section>
              </div>
            </>
          ) : (
            <p>Producto no encontrado</p>
          )}
          <FollowUs />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
