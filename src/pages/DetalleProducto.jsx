import { ListGroup, Button, Col, Row } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function DetalleProducto() {
  const { id } = useParams();
  const { listaProductos, agregarAlCarrito } = useCarrito();
  
// Se busca el libro por su id, asegurando que ambos sean strings para evitar problemas de comparación
  const libro = listaProductos.find(
    (prod) => prod.id?.toString() === id?.toString(),
  );

  if (!libro) {
    return (
      <div className="text-center py-5">
        <h3>El libro no existe</h3>
        <Button as={Link} to="/productos" variant="dark" className="mt-3">
          Volver al catálogo
        </Button>
      </div>
    );
  }

  const sinStock = libro.stock === 0;

  return (
    <Row className="gy-4 align-items-center text-start my-3">
      <Col lg={5} className="text-center">
        <img
          src={libro.imagen}
          alt={libro.nombre}
          className="img-fluid rounded-3 shadow border"
          style={{ maxHeight: "450px", objectFit: "cover" }}
        />
      </Col>
      <Col lg={7}>
        <span className="badge bg-dark mb-2 text-uppercase px-3 py-2">
          {libro.categoria}
        </span>
        <h1 className="fw-bold display-6 mb-1 text-dark">{libro.nombre}</h1>
        <h5 className="text-muted mb-4">{libro.autor}</h5>

        <p className="fs-6 text-secondary mb-4" style={{ lineHeight: "1.6" }}>
          {libro.descripcion}
        </p>

        <div className="mb-4">
          <h6 className="fw-bold text-uppercase small text-dark mb-2">
            Especificaciones del ejemplar
          </h6>
          <ListGroup variant="flush" className="border rounded-3 bg-white">
            <ListGroup.Item className="small py-2 text-muted">
              <strong>Autor:</strong> {libro.autor}
            </ListGroup.Item>
            <ListGroup.Item className="small py-2 text-muted">
              <strong>Editorial:</strong> {libro.editorial}
            </ListGroup.Item>
            <ListGroup.Item className="small py-2 text-muted">
              <strong>Páginas:</strong> {libro.paginas || "N/C"}
            </ListGroup.Item>
            <ListGroup.Item className="small py-2 text-muted">
              <strong>Disponibilidad:</strong>{" "}
              {sinStock ? "Sin Stock" : `${libro.stock} unidades`}
            </ListGroup.Item>
          </ListGroup>
        </div>

        <div className="p-3 bg-white rounded-3 mb-4 border d-flex justify-content-between align-items-center">
          <div>
            <span className="text-muted small d-block">Precio Unitario</span>
            <span className="fw-bold fs-4 text-dark">
              ${libro.precio.toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        <div className="d-grid gap-3">
          <Button
            variant="dark"
            size="lg"
            className="px-4 fw-bold"
            disabled={sinStock}
            onClick={() => agregarAlCarrito(libro)}
          >
            {sinStock ? "Sin Stock Disponible" : "Agregar al Carrito 🛒"}
          </Button>
          <Button
            as={Link}
            to="/productos"
            variant="outline-secondary"
            size="lg"
            className="px-4"
          >
            Volver al Catálogo 📚
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default DetalleProducto;
