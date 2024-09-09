import React, { useEffect, useState } from "react";
import "./productdetail.css";
import { useParams } from "react-router-dom";
import { db } from "../../config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../Spinner/Spinner";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      console.log("Fetching product with ID:", id);
      try {
        const productRef = doc(db, "productos", id);
        const response = await getDoc(productRef);

        if (response.exists()) {
          console.log("Product data:", response.data());
          setProduct(response.data());
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
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {product ? (
            <>
              <h2>asd</h2>
              <h2>asd: {product.nombre}</h2>
              <h1>{product.nombre}</h1>
              <img src={product.img} alt={product.nombre} />
              <p>Precio Minorista: ${product.precioMinorista}</p>
              <p>Precio Mayorista: ${product.precioMayorista}</p>
              <p>Descripción: {product.descripcion}</p>
            </>
          ) : (
            <>
              <p>Producto no encontrado</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
