import { Button } from "react-bootstrap";
import { useCarrito } from "../context/CarritoContext";

export default function CarritoItem({ item }) {
  const { modificarCantidad, eliminarProducto } = useCarrito();

  const subtotal = item.precio * item.cantidad;

  return (
    <tr>
      <td className="text-start ps-4 py-3">
        <div className="d-flex align-items-center gap-3">
          <img
            src={item.imagen}
            alt={item.nombre}
            style={{ width: "45px", height: "65px", objectFit: "contain" }}
            className="border bg-light p-1 rounded"
          />
          <div>
            <span className="fw-bold d-block small text-uppercase">
              {item.nombre}
            </span>
            <span
              className="text-muted xsmall d-block"
              style={{ fontSize: "0.75rem" }}
            >
              {item.autor}
            </span>
          </div>
        </div>
      </td>
      <td className="fw-semibold text-secondary">
        ${item.precio.toLocaleString("es-AR")}
      </td>
      <td>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            className="px-2 py-0 fw-bold"
            onClick={() => modificarCantidad(item.id, "restar")}
          >
            -
          </Button>
          <span className="fw-bold px-1" style={{ minWidth: "20px" }}>
            {item.cantidad}
          </span>
          <Button
            variant="outline-secondary"
            size="sm"
            className="px-2 py-0 fw-bold"
            onClick={() => modificarCantidad(item.id, "sumar")}
          >
            +
          </Button>
        </div>
      </td>
      <td className="fw-bold">${subtotal.toLocaleString("es-AR")}</td>
      <td className="pe-4">
        <Button
          variant="link"
          className="text-danger p-0 border-0 shadow-none text-decoration-none"
          onClick={() => eliminarProducto(item.id)}
          title="Eliminar producto"
        >
          🗑️
        </Button>
      </td>
    </tr>
  );
}
