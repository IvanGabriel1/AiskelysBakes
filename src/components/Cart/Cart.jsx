import React from "react";
import { useContext, useEffect, useState } from "react";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  retirarItemCarrito,
  actualizarProductosEnCarrito,
  vaciarCarrito,
} from "../../redux/cartSlice";
import Swal from "sweetalert2";
import QuantityButtons from "../QuantityButtons/QuantityButtons";
import { Link } from "react-router-dom";
import Accordion from "../Accordion/Accordion";
import AuthContext from "../../context/AuthContext";
import { auth, db } from "../../config/Firebase";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { useModal } from "../../hooks/useModal";
import ModalPay from "../ModalPay/ModalPay";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isMayorista, setIsMayorista] = useState(false);
  const [zonasData, setZonasData] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [zonaShippingCost, setZonaShippingCost] = useState("");

  //const cart = useSelector((state) => state.cart);

  const [isOpenModalPay, openModalPay, closeModalPay] = useModal(false);

  const envioGratis = 100;
  const compraMinima = 20;

  //const { userEmailVerified, email } = useContext(AuthContext);
  const { userEmailVerified, setUserEmailVerified } = useContext(AuthContext);

  useEffect(() => {
    if (items.length > 0) {
      // Actualiza el estado de isMayorista según la categoría y cantidad del primer producto como ejemplo
      const firstProduct = items[0];
      const categoria = firstProduct.categoria.toLowerCase();
      const cantidadProducto = firstProduct.cantidad;

      if (categoria === "alfajor" && cantidadProducto >= 12) {
        setIsMayorista(true);
      } else if (categoria === "bombon" && cantidadProducto >= 36) {
        setIsMayorista(true);
      } else if (categoria === "torta" && cantidadProducto >= 3) {
        setIsMayorista(true);
      } else {
        setIsMayorista(false);
      }
    }
  }, [items]);

  useEffect(() => {
    fetch(`/zonasEnvios.json`)
      .then((response) => response.json())
      .then((data) => setZonasData(Object.values(data.municipios)))
      .catch((error) => console.error("Error al cargar zonas:", error));
    // console.log(zonasData);
  }, []);

  //Aviso Por el momento solo aceptamos pagos por transferencia:
  useEffect(() => {
    Swal.fire({
      title: "Forma de pago",
      text: "Por el momento solo aceptamos pagos por transferencia",
      icon: "info",
      confirmButtonText: "Aceptar",
      timer: 6000,
      timerProgressBar: true,
    });
  }, []);

  const getAuthenticatedUserEmail = () => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuario autenticado:", user.email);
        return user.email;
      } else {
        console.log("No hay ningún usuario autenticado.");
        return null;
      }
    });
  };

  const getDataFromFirebase = async (email) => {
    if (!email) {
      console.error("Email no disponible.");
      return null;
    }

    const userCollection = collection(db, "users");

    try {
      const busqueda = query(userCollection, where("mail", "==", email));
      const queryBusqueda = await getDocs(busqueda);

      if (!queryBusqueda.empty) {
        const userDoc = queryBusqueda.docs[0];
        const { telefono, nombre, apellido } = userDoc.data();

        console.log(
          "Teléfono:",
          telefono,
          "Nombre:",
          nombre,
          "Apellido:",
          apellido
        );
        return { telefono, nombre, apellido };
      } else {
        console.log("No se encontró ningún usuario con ese mail.");
        return null;
      }
    } catch (err) {
      console.error("Error al obtener los datos del usuario:", err);
      throw err;
    }
  };

  useEffect(() => {
    const email = getAuthenticatedUserEmail();

    if (email) {
      getDataFromFirebase(email);
    }
  }, []);

  // Funcion actualiza productos con el carrito
  const sincronizarProductosCarrito = async () => {
    try {
      const productosRef = collection(db, "productos");
      const snapshot = await getDocs(productosRef);
      const firebaseProductos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Actualiza los productos sólo si hay cambios
      const productosActualizados = items.map((item) => {
        const productoFirebase = firebaseProductos.find(
          (prod) => prod.id === item.id
        );

        if (productoFirebase) {
          return {
            ...item,
            precioMinorista: productoFirebase.precioMinorista,
            precioMayorista: productoFirebase.precioMayorista,
            descuento: productoFirebase.descuento || 0,
            descuentoMayorista: productoFirebase.descuentoMayorista || 0,
          };
        }

        return item;
      });

      // Compara los productos actuales con los nuevos para evitar actualizaciones innecesarias
      if (JSON.stringify(productosActualizados) !== JSON.stringify(items)) {
        dispatch(actualizarProductosEnCarrito(productosActualizados));
        Swal.fire({
          title: "Carrito actualizado",
          text: "Se ha actualizado el carrito",
          icon: "info", //info / warning
          confirmButtonText: "Aceptar",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error al sincronizar productos del carrito:", error);
    }
  };

  // Ejecutamos funcion actualiza productos:
  useEffect(() => {
    sincronizarProductosCarrito();
  }, [items]);

  const calcularSubtotal = () => {
    return items.reduce((acc, product) => {
      const isMayorista =
        (product.categoria.toLowerCase() === "alfajor" &&
          product.cantidad >= 12) ||
        (product.categoria.toLowerCase() === "bombon" &&
          product.cantidad >= 36) ||
        (product.categoria.toLowerCase() === "torta" && product.cantidad >= 3);

      // Aplica el descuento adecuado si existe
      const precioAplicable = isMayorista
        ? product.precioMayorista *
          (1 - (product.descuentoMayorista || 0) / 100) // Aplica descuento mayorista si existe
        : product.precioMinorista * (1 - (product.descuento || 0) / 100); // Aplica descuento minorista si existe

      const sumaTotal = precioAplicable * product.cantidad;
      return acc + sumaTotal;
    }, 0);
  };

  const handleSacarItem = (id) => {
    // console.log(id);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Se eliminará el producto del carrito!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(retirarItemCarrito({ id }));
      }
    });
  };

  const handleVaciarCarrito = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Se eliminarán TODOS los productos del carrito!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(vaciarCarrito());
      }
    });
  };

  const handleSelectShippingCost = (cost, zona) => {
    setShippingCost(cost);
    setZonaShippingCost(zona);
  };

  const sumaFinal =
    calcularSubtotal() >= envioGratis
      ? calcularSubtotal()
      : calcularSubtotal() + shippingCost;

  const envioGratisAplicado = calcularSubtotal() >= envioGratis ? true : false;

  const varSubTotal = calcularSubtotal();

  const [telefono, setTelefono] = useState();
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();

  const obtenerTelefono = async () => {
    const auth = getAuth(); // Inicializa Firebase Auth
    const user = auth.currentUser; // Obtén el usuario autenticado
    try {
      const userRef = doc(db, "users", user.uid); // uid debe estar definido
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setTelefono(userData.telephone || "");
        setNombre(userData.nombre || "");
        setApellido(userData.apellido || "");
      } else {
        console.log("No se encontró el documento del usuario.");
      }
    } catch (error) {
      console.error("Error al obtener el documento:", error);
    }
  };

  //btn Ir a pagar:
  const handlePay = async () => {
    setLoading(true);
    obtenerTelefono();
    console.log(telefono);
    console.log(nombre);
    console.log(apellido);

    const user = auth.currentUser;
    await user.reload();
    // Aquí verificas si el correo está verificado y actualizas el estado
    setUserEmailVerified(user.emailVerified);

    // Verifica sincronización antes de continuar
    const sincronizacionExitosa = await sincronizarProductosCarrito();
    if (sincronizacionExitosa) {
      setLoading(false);
      return;
    }

    // Validaciones de usuario y montos
    if (sumaFinal < compraMinima) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "El monto de la compra es menor al monto mínimo",
        showConfirmButton: false,
        timer: 2000,
      });
      setLoading(false);
      return;
    }

    if (!user) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Debes iniciar sesión para continuar",
        showConfirmButton: false,
        timer: 2000,
      });
      setLoading(false);
      return;
    }

    await user.reload();

    if (!user.emailVerified) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Tienes que validar el email primero",
        showConfirmButton: false,
        timer: 2000,
      });
      setLoading(false);
      return;
    }

    openModalPay();
    // Lógica para realizar el pago (pendiente de implementar)
  };

  return (
    <div className="cart-component-container">
      <h2 className="title">Carrito de compras</h2>
      {items.length === 0 ? (
        <article className="cart-emptycart">
          <h2>No tienes productos en el carrito</h2>
          <Link
            to={"/productos"}
            className="cart-btn-link-productos"
            aria-label="Ver la lista completa de productos"
          >
            Ver Productos
          </Link>
        </article>
      ) : (
        <>
          {compraMinima ? (
            <h5>La compra minima es de $ {compraMinima}.-</h5>
          ) : (
            " "
          )}
          <section className="cart-container">
            <div>
              <ul className="cart-ul">
                {items.map((product) => {
                  const categoriaMinuscula = product.categoria.toLowerCase();
                  const isMayorista =
                    (categoriaMinuscula === "alfajor" &&
                      product.cantidad >= 12) ||
                    (categoriaMinuscula === "bombon" &&
                      product.cantidad >= 36) ||
                    (categoriaMinuscula === "torta" && product.cantidad >= 3);

                  const cantidadPorCategoria =
                    categoriaMinuscula === "alfajor"
                      ? "Precio mayorista a partir de 12 unidades"
                      : categoriaMinuscula === "bombon"
                      ? "Precio mayorista a partir de 36 unidades"
                      : categoriaMinuscula === "torta"
                      ? "Precio mayorista a partir de 3 unidades"
                      : "Sin precio por mayorista";

                  return (
                    <li className="cart-item" key={product.id}>
                      <div className="cart-item-container">
                        <picture className="card-product-picture">
                          <img
                            className="card-product-picture-img"
                            src={product.img}
                            alt={product.nombre}
                          />
                          {product.descuentoMayorista ? (
                            <span className="card-product-picture-spanmayorista">
                              Mayorista: -{product.descuentoMayorista}%
                            </span>
                          ) : (
                            ""
                          )}
                          {product.descuento ? (
                            <span className="card-product-picture-span">
                              Minorista: -{product.descuento}%
                            </span>
                          ) : (
                            ""
                          )}
                        </picture>

                        <span className="cart-product-nombre">
                          {product.nombre}
                        </span>

                        <p className="cart-cantidad-por-categoria">
                          {cantidadPorCategoria}
                        </p>

                        <div className="card-product-price-container">
                          <div className="cart-product-quantity">
                            {product.descuento ? (
                              <strong>
                                <p>
                                  Minorista: $<s>{product.precioMinorista}</s> /{" "}
                                  {product.precioMinorista -
                                    product.precioMinorista *
                                      (product.descuento / 100).toFixed(2)}{" "}
                                  usd.-
                                </p>
                              </strong>
                            ) : (
                              <strong>
                                <p>
                                  Minorista: ${product.precioMinorista} usd.-
                                </p>
                              </strong>
                            )}

                            {product.descuentoMayorista ? (
                              <p>
                                <strong>
                                  Mayorista: $ <s>{product.precioMayorista}</s>/{" "}
                                  {(
                                    product.precioMayorista -
                                    product.precioMayorista *
                                      (product.descuentoMayorista / 100)
                                  ).toFixed(2)}{" "}
                                  usd.-
                                </strong>
                              </p>
                            ) : (
                              <p>
                                <strong>
                                  Mayorista: ${product.precioMayorista} usd.-
                                </strong>
                              </p>
                            )}
                          </div>
                        </div>
                        <QuantityButtons
                          id={product.id}
                          nombre={product.nombre}
                          precioMinorista={product.precioMinorista}
                          precioMayorista={product.precioMayorista}
                          cantidad={product.cantidad}
                          img={product.img}
                          categoria={product.categoria}
                          descuento={product.descuento}
                          descuentoMayorista={product.descuentoMayorista}
                          descripcion={product.descripcion}
                        />

                        <span className="cart-item-total">
                          Total: $
                          {isMayorista
                            ? (
                                product.precioMayorista *
                                (1 - (product.descuentoMayorista || 0) / 100) *
                                product.cantidad
                              ).toFixed(2)
                            : (
                                product.precioMinorista *
                                (1 - (product.descuento || 0) / 100) *
                                product.cantidad
                              ).toFixed(2)}
                        </span>

                        <Link
                          to={`/item/${product.id}`}
                          className="item-details-btn"
                        >
                          Ver detalles
                        </Link>

                        <button
                          className="cart-delete-btn"
                          onClick={() => handleSacarItem(product.id)}
                        >
                          X
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <button
                className="btn-empty-cart"
                onClick={() => handleVaciarCarrito()}
              >
                Vaciar Carrito
              </button>
            </div>

            <section className="cart-summary">
              <h3>Totales del carrito</h3>
              <span className="cart-summary-subtotal">
                Subtotal: ${calcularSubtotal().toFixed(2)}
              </span>

              <p className="cart-summary-p-envio">
                Envio gratis a partir de $ {envioGratis}!
              </p>

              {calcularSubtotal() >= envioGratis ? (
                <span className="envio-gratis-logrado">🎊Envio Gratis!🎊</span>
              ) : (
                ""
              )}

              <p className="cart-summary-p-envio">
                Calcular el costo de envio:
              </p>
              <Accordion
                title="Seleccione una zona"
                options={zonasData}
                onSelectShippingCost={handleSelectShippingCost}
              />
              {zonaShippingCost ? (
                <p className="cart-summary-confirm-shipping">
                  {zonaShippingCost} - $ {shippingCost}
                </p>
              ) : null}
              <span className="cart-summary-total">
                Total: ${sumaFinal.toFixed(2)}
              </span>

              <button className="btn-go-to-pay" onClick={() => handlePay()}>
                {loading ? (
                  <div className="btn-go-to-pay-spinner" />
                ) : (
                  "Continuar"
                )}
              </button>
            </section>

            {isOpenModalPay ? (
              <ModalPay
                closeModal={closeModalPay}
                sumaFinal={sumaFinal}
                userEmailVerified={userEmailVerified}
                closeModalPay={closeModalPay}
                zonaShippingCost={zonaShippingCost}
                shippingCost={shippingCost}
                envioGratisAplicado={envioGratisAplicado}
                varSubTotal={varSubTotal}
                telefono={telefono}
                nombre={nombre}
                apellido={apellido}
                setLoading={setLoading}
              />
            ) : null}
          </section>
        </>
      )}
    </div>
  );
};

export default Cart;
