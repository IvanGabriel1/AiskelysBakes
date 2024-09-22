import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para obtener el categoryId de la URL
import "./bodyproductos.css";
import { collection, getDocs, query, where } from "firebase/firestore"; // Para consultas filtradas
import { db } from "../../config/Firebase";
import ProductItem from "../ProductItem/ProductItem";
import FilterByCategory from "../FilterByCategory/FilterByCategory";
import HeroImage from "../HeroImage/HeroImage";
import heroProductos from "../../assets/hero-productos.jpg";
import FollowUs from "../FollowUs/FollowUs";
import Spinner from "../Spinner/Spinner";

const BodyProductos = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams(); // Captura el parámetro categoryId de la URL

  useEffect(() => {
    const fetchProducts = async () => {
      let productsQuery = collection(db, "productos");

      // Si hay un categoryId, aplica el filtro por categoría
      if (categoryId) {
        productsQuery = query(
          productsQuery,
          where(
            "categoria",
            "==",
            categoryId.charAt(0).toUpperCase() + categoryId.slice(1)
          )
        );
      }

      const productsSnapshot = await getDocs(productsQuery);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsList);
    };

    fetchProducts();
  }, [categoryId]); // Dependencia para volver a cargar los productos al cambiar de categoría

  return (
    <>
      <HeroImage
        img={heroProductos}
        text1={"Nuestros Productos"}
        text2={"Postres de calidad"}
      />

      <h2 className="title">Nuestros Productos</h2>

      <p className="aviso-productos">
        <strong>Condiciones para mayoristas:</strong> A partir de 12 unidades
        del mismo producto o 24 en el caso de bombones, se aplicará el precio
        mayorista. Para cantidades menores, se cobrará a precio minorista. Los
        pedidos deben realizarse con un mínimo de 7 días de anticipación.
      </p>

      <FilterByCategory />

      <div className="listGroup">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))
        ) : (
          <Spinner />
        )}
      </div>

      <FollowUs />
    </>
  );
};

export default BodyProductos;
