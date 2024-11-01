import "./quantitybuttons.css";
import { useDispatch } from "react-redux";
import { agregarProducto, quitarProducto } from "../../redux/cartSlice";

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
}) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    console.log("Agregando producto con ID:", id);
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
      })
    );
  };

  const handleRemove = () => {
    console.log("Quitando producto con ID:", id);
    dispatch(quitarProducto({ id }));
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
