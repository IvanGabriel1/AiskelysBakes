import React, { useEffect, useState } from "react";
import "./formtransferencia.css";
import { send } from "emailjs-com";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/Firebase";
import { doc, getDoc } from "firebase/firestore";

const FormTransferencia = ({
  sumaFinal,
  userEmailVerified,
  telefono,
  nombre,
  apellido,
}) => {
  const [loading, setLoading] = useState(false);
  // const [userPhone, setUserPhone] = useState("");
  const cart = useSelector((state) => state.cart);

  //------------

  const [product, setProduct] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!cart || !cart.items || cart.items.length === 0) {
        console.warn("No hay productos en el carrito");
        return;
      }

      try {
        // Si tienes múltiples productos en el carrito, itera sobre ellos
        const productPromises = cart.items.map(async (item) => {
          const productRef = doc(db, "productos", item.id); // Suponiendo que cada item tiene un 'id'
          const response = await getDoc(productRef);
          if (response.exists()) {
            return { ...response.data(), id: response.id };
          } else {
            console.log("No existe el documento");
            return null;
          }
        });

        // Espera a que todos los productos sean cargados
        const products = await Promise.all(productPromises);
        setProduct(products.filter((product) => product !== null));
      } catch (error) {
        console.log(`Error fetch product`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [cart]);

  const [userMail, setUserMail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserMail(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const enviarMailFormTransferencia = async () => {
    if (!userMail) return console.warn("No hay mail");
    if (!userEmailVerified)
      return console.warn("Tienes que verificar tu Correo electronico");
    if (!cart.items) return console.warn("No cart.length");
    if (!sumaFinal) return console.warn("No hay sumaFinal");
    if (!telefono) return console.warn("No hay telefono");
    if (!nombre) return console.warn("No hay nombre");
    if (!apellido) return console.warn("No hay apellido");

    // setLoading(true);

    // const cartContent = cart.items
    //   .map((item) => {
    //     const fullProduct = product?.find((p) => p.id === item.id);
    //     return `
    //   ${item.categoria}
    //   ${item.nombre} -
    //   ${fullProduct?.descripcion || "Sin descripción"}
    //   (Cantidad: ${item.cantidad})
    //   <img src="${item.img}" alt="${
    //       item.nombre
    //     }" style="max-width: 200px; height: auto;" /><br>
    // `;
    //   })
    //   .join("\n");

    const cartContent = `
  <div style="font-family: Arial, sans-serif; color: #333; margin: 20px;">
    <h2 style="text-align: center; color: #4CAF50;">Resumen de Pedido - ${new Date().toLocaleString()}</h2>
    <p style="font-size: 16px;">Gracias por recibir un pedido. A continuación se detallan los productos solicitados:</p>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background-color: #f2f2f2; text-align: left;">
          <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Producto</th>
          <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Descripción</th>
          <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Cantidad</th>
          <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Precio Unitario</th>
          <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Imagen</th>
        </tr>
      </thead>
      <tbody>
        ${cart.items
          .map((item) => {
            const fullProduct = Array.isArray(product)
              ? product.find((p) => p.id === item.id)
              : null;
            return `
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${
                  item.nombre
                }</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
                  ${fullProduct?.descripcion || "Sin descripción"}
                </td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${
                  item.cantidad
                }</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
                  $${(item.precio * item.cantidad).toFixed(2)}
                </td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
                  <img src="${item.img}" alt="${
              item.nombre
            }" style="max-width: 100px; height: auto; border-radius: 5px;" />
                </td>
              </tr>
            `;
          })
          .join("")}
      </tbody>
    </table>
    <div style="margin-top: 20px; text-align: right;">
      <h3 style="color: #4CAF50;">Total: $${sumaFinal.toFixed(2)}</h3>
    </div>
    <p style="text-align: center; color: #666; font-size: 14px;">
      Este es un resumen del pedido recibido. Si tienes alguna pregunta o duda, no dudes en contactarnos. Gracias por elegirnos.
    </p>
    <div style="text-align: center; color: #777; font-size: 12px;">
      <p>Dirección de contacto: [Email del Ecommerce]</p>
      <p>Teléfono de contacto: [Número de contacto]</p>
    </div>
  </div>
`;

    //template para el comercip
    const templateParams = {
      cart_content: cartContent,
      monto_total: sumaFinal,
      user_email: userMail,
      user_phone: telefono,
      user_name: nombre,
      user_lastname: apellido,
    };

    //template para el usuario
    const templateParamsToUser = {
      cart_content: cartContent,
      monto_total: sumaFinal,
      user_email: userMail,
    };

    //Mail al comercio:
    try {
      await send(
        "service_contact",
        "template_1jyyg2h",
        templateParams,
        "WYVJMvEJlHQIHxScZ"
      );
      alert("Correo enviado correctamente");

      console.log("Email enviado al:", userMail);
      console.log("telefono:", telefono);
      console.log("nombre:", nombre);
      console.log("apellido:", apellido);
    } catch (error) {
      console.error("El Correo NO pudo ser enviado", error);
      alert("Hubo un problema al enviar el correo.");
    } finally {
      setLoading(false);
    }

    //Mail de confirmacion al usuario:
    try {
      await send(
        "service_contact",
        "template_w5tiu2j",
        templateParamsToUser,
        "WYVJMvEJlHQIHxScZ"
      );
    } catch (error) {
      console.error("El Correo NO pudo ser enviado", error);
      alert("Hubo un problema al enviar el correo al comprador.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article>
      <h3>Transferencia:</h3>
      <p>
        Haz click en enviar y te mandaremos un correo electrónico con los datos
        bancarios para que puedas realizar la transferencia. Luego nos mandas el
        comprobante de transferencia por mail o WhatsApp y coordinamos la
        entrega.
      </p>
      <button onClick={enviarMailFormTransferencia} disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </article>
  );
};

export default FormTransferencia;
