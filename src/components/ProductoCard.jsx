import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito();
  const sinStock = producto.stock === 0;

  return (
    <Card className="h-100 shadow-sm border-0 position-relative">
      {sinStock && (
        <span className="badge bg-danger position-absolute top-0 end-0 m-2 z-3 px-2 py-1">
          Sin stock
        </span>
      )}

      <div
        style={{ height: "260px", overflow: "hidden" }}
        className="bg-light d-flex align-items-center justify-content-center"
      >
        <Card.Img
          variant="top"
          src={producto.imagen}
          style={{ maxHeight: "100%", width: "auto", objectFit: "contain" }}
          className="p-2 card-img-top"
        />
      </div>

      <Card.Body className="d-flex flex-column text-start">
        <span className="text-muted small text-uppercase fw-bold">
          {producto.categoria}
        </span>
        <Card.Title
          className="fs-5 fw-bold text-truncate mt-1 mb-0"
          title={producto.nombre}
        >
          {producto.nombre}
        </Card.Title>
        <span className="text-secondary small mb-2">{producto.autor}</span>

        <Card.Text className="fw-bold fs-5 mt-auto mb-3">
          ${producto.precio.toLocaleString("es-AR")}
        </Card.Text>

        <div className="d-grid gap-2">
          <Button
            variant="dark"
            disabled={sinStock}
            onClick={() => agregarAlCarrito(producto)}
            className="fw-bold btn-sm carrito-btn-custom"
          >
            {sinStock ? "No disponible" : "Agregar al Carrito 🛒"}
          </Button>
          <Button
            as={Link}
            to={`/productos/${producto.id}`}
            variant="outline-secondary"
            className="btn-sm"
          >
            Ver Detalle 👁️
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductoCard;
