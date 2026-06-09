import { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function Productos() {
  const { listaProductos, agregarAlCarrito } = useCarrito();
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  // Obtener categorías
  const categorias = useMemo(() => {
    const lista = listaProductos.map((p) => p.categoria);
    return ["Todos", ...new Set(lista)];
  }, [listaProductos]);

  // Filtrado de productos por búsqueda y categoría
  const productosFiltrados = useMemo(() => {
    return listaProductos.filter((producto) => {
      const coincideBusqueda =
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.autor.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCategoria =
        categoriaSeleccionada === "Todos" ||
        producto.categoria === categoriaSeleccionada;
      return coincideBusqueda && coincideCategoria;
    });
  }, [listaProductos, busqueda, categoriaSeleccionada]);

  return (
    <Container className="py-2 text-start">
      <div className="border-bottom mb-4 pb-3">
        <h2 className="fw-bold"> Tu Próxima Aventura</h2>
        <p className="text-muted mb-0">
          Descubrí historias que despiertan pasiones, inspiran y transforman.
        </p>
      </div>

      <Row className="mb-4 g-3">
        <Col md={7} lg={8}>
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0 text-muted">
              🔍
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar por título o autor..."
              className="border-start-0 ps-0 shadow-none"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={5} lg={4}>
          <Form.Select
            className="shadow-none"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {productosFiltrados.length === 0 ? (
        <div className="text-center py-5 border rounded bg-light">
          <p className="text-muted fs-5 mb-0">
            No se encontraron libros que coincidan con tu criterio.
          </p>
        </div>
      ) : (
        <Row className="g-4">
          {productosFiltrados.map((libro) => {
            const sinStock = libro.stock <= 0;
            return (
              <Col key={libro.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="h-100 border rounded-3 bg-white shadow-sm d-flex flex-column transition-card">
                  <div
                    className="text-center p-3 position-relative"
                    style={{
                      height: "220px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={libro.imagen}
                      style={{
                        maxHeight: "100%",
                        width: "auto",
                        objectFit: "contain",
                      }}
                    />
                    {sinStock && (
                      <span
                        className="position-absolute bg-danger text-white px-2 py-1 small fw-bold rounded"
                        style={{
                          top: "10px",
                          right: "10px",
                          fontSize: "0.75rem",
                        }}
                      >
                        AGOTADO
                      </span>
                    )}
                  </div>
                  <Card.Body className="d-flex flex-column pt-1">
                    <span
                      className="text-uppercase text-muted fw-bold user-select-none"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {libro.categoria}
                    </span>
                    <Card.Title
                      className="fw-bold text-dark text-truncate mb-1 fs-6 mt-1"
                      title={libro.nombre}
                    >
                      {libro.nombre.toUpperCase()}
                    </Card.Title>
                    <Card.Text className="text-secondary small text-truncate mb-3">
                      {libro.autor}
                    </Card.Text>

                    <div className="mt-auto pt-2 border-top d-flex flex-column gap-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-dark fs-5">
                          ${libro.precio.toLocaleString("es-AR")}
                        </span>
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          Stock: {libro.stock}
                        </span>
                      </div>

                      <Button
                        as={Link}
                        to={`/productos/${libro.id}`}
                        variant="outline-secondary"
                        size="sm"
                        className="w-100 py-1"
                      >
                        👁️ Ver Detalles
                      </Button>

                      <Button
                        variant="dark"
                        size="sm"
                        className="w-100 py-1"
                        disabled={sinStock}
                        onClick={() => agregarAlCarrito(libro)}
                      >
                        🛒 Agregar al Carrito
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}

export default Productos;
