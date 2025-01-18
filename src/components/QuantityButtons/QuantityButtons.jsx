import "./quantitybuttons.css";
import { useDispatch } from "react-redux";
import { agregarProducto, quitarProducto } from "../../redux/cartSlice";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const QuantityButtons = ({
  id,
  nombre,
  precioMinorista,
  cantidad,
  precioMayorista,
  img,
  categoria,
  descuento,
  descuentoMayorista,
  descripcion,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleAdd = () => {
    // console.log("Agregando producto con ID:", id);
    dispatch(
      agregarProducto({
        id,
        nombre,
        precioMinorista,
        precioMayorista,
        img,
        categoria,
        descuento,
        descuentoMayorista,
        cantidad,
        descripcion,
      })
    );
  };

  const handleRemove = () => {
    if (cantidad === 1 && location.pathname === `/carrito`) {
      Swal.fire({
        title: "¿Deseas quitar el producto?",
        text: "Esta es la última unidad de este producto en el carrito.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, quitar",
        cancelButtonText: "No, mantener",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(quitarProducto({ id }));
        }
      });
    } else {
      // console.log("Quitando producto con ID:", id);
      dispatch(quitarProducto({ id }));
    }
  };

  return (
    <div className="quantity-buttons-container">
      <button onClick={handleRemove}>-</button>
      <output> {cantidad} </output>
      <button onClick={handleAdd}>+</button>
    </div>
  );
};

export default QuantityButtons;
