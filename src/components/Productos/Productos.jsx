import React, { useEffect, useState } from "react";
import "./productos.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/Firebase";
import ProductItem from "../ProductItem/ProductItem";

const Productos = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "productos");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };
    fetchProducts();
  }, []);

  return (
    <div className="listGroup">
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Productos;
