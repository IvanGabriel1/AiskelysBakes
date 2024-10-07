import React, { useEffect, useState } from "react";
import "./productdetail.css";
import { useParams } from "react-router-dom";
import { db } from "../../config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../Spinner/Spinner";
import FollowUs from "../FollowUs/FollowUs";
import Carousel from "../Carousel/Carousel";
import QuantityButtons from "../QuantityButtons/QuantityButtons";
import { useSelector } from "react-redux";
import { selectProductQuantity } from "../../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const cantidad = useSelector((state) => selectProductQuantity(state, id));

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      console.log("Fetching product with ID:", id);
      try {
        const productRef = doc(db, "productos", id);
        const response = await getDoc(productRef);

        if (response.exists()) {
          console.log("Product data:", response.data());
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

  return (
    <div className="item-details-container">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {product ? ( // Asegurarse de que product no sea null antes de acceder a sus propiedades
            <>
              <p className="prod-detail-prod-nombre">
                <strong>{product.nombre}</strong>
              </p>

              <div className="prod-detail-sections-large">
                <Carousel
                  images={[product.img, product.img2, product.img3].filter(
                    Boolean
                  )}
                />

                <div className="prod-detail-info-large">
                  <p className="aviso-productos">
                    <strong>Condiciones para mayoristas:</strong> A partir de 12
                    unidades del mismo producto...
                  </p>

                  <section className="prod-detail-price-section">
                    <p className="prod-detail-price">
                      Precio Minorista: ${product.precioMinorista} usd.
                    </p>
                    <p className="prod-detail-price">
                      Precio Mayorista: ${product.precioMayorista} usd.
                    </p>
                    <QuantityButtons
                      id={product.id}
                      nombre={product.nombre}
                      precioMinorista={product.precioMinorista}
                      precioMayorista={product.precioMayorista}
                      cantidad={cantidad}
                      img={product.img}
                      categoria={product.categoria}
                    />
                  </section>
                </div>
              </div>

              <section className="item-details-description-section">
                <p>
                  <strong>Descripción:</strong>
                </p>
                <p className="item-details-description">
                  {product.descripcion}
                </p>
              </section>
            </>
          ) : (
            <p>Producto no encontrado</p> // Mensaje de error si no hay producto
          )}
          <FollowUs />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
