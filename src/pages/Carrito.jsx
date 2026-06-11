import { useState } from "react";
import { Button, Col, Row, Table, Form, InputGroup } from "react-bootstrap";
import CarritoItem from "../components/CarritoItem";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function Carrito() {
  const { 
    carrito, 
    totalItems, 
    subtotalPrecio, 
    montoDescuento, 
    totalPrecio, 
    cupónActivo, 
    aplicarCupon, 
    removerCupon, 
    vaciarCarrito 
  } = useCarrito();

  // Estados locales para controlar el casillero de entrada del cupón
  const [codigoTexto, setCodigoTexto] = useState("");
  const [alertaCupon, setAlertaCupon] = useState({ mensaje: "", esExito: false });

// Función para manejar la validación del cupón al enviar el formulario
  const handleValidarCupon = (e) => {
    e.preventDefault();
    if (!codigoTexto.trim()) return;

    const resultado = aplicarCupon(codigoTexto);
    setAlertaCupon({ mensaje: resultado.mensaje, esExito: resultado.exito });
    
    if (resultado.exito) {
      setCodigoTexto(""); // Limpia el input si funcionó
    }
  };

  // Función para remover el cupón activo, si lo hay, y limpiar la alerta
  const handleRemoverTodoCupon = () => {
    removerCupon();
    setAlertaCupon({ mensaje: "", esExito: false });
  };

  if (carrito.length === 0) {
    return (
      <div className="text-center py-5">
        <span className="display-1 d-block mb-3">🛒</span>
        <h2 className="fw-bold">El carrito está vacío</h2>
        <Button
          as={Link}
          to="/productos"
          variant="dark"
          className="mt-3 px-4 py-2"
        >
          Explorar Libros
        </Button>
      </div>
    );
  }

  return (
    <div className="text-start py-2">
      <h2 className="fw-bold mb-4">Carrito de Compras</h2>
      <Row className="gy-4">
        <Col lg={8}>
          <div className="table-responsive bg-white rounded-3 border shadow-sm">
            <Table hover align="middle" className="mb-0 text-center">
              <thead className="bg-dark text-white">
                <tr>
                  <th className="text-start ps-4">Libro</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th className="pe-4">Acción</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <CarritoItem key={item.id} item={item} />
                ))}
              </tbody>
            </Table>
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            className="mt-3 fw-semibold"
            onClick={vaciarCarrito}
          >
            Vaciar Carrito
          </Button>
        </Col>

        <Col lg={4}>
          <div
            className="p-4 bg-white rounded-3 border shadow-sm position-sticky"
            style={{ top: "100px" }}
          >
            <h4 className="fw-bold mb-3 border-bottom pb-2">
              Resumen del Pedido
            </h4>
            
            <div className="d-flex justify-content-between mb-2 fs-6 text-secondary">
              <span>Artículos Totales:</span>
              <span className="fw-bold">{totalItems} u.</span>
            </div>

            <div className="d-flex justify-content-between mb-2 fs-6 text-secondary">
              <span>Subtotal:</span>
              <span className="fw-semibold">${subtotalPrecio.toLocaleString("es-AR")}</span>
            </div>

            {/* Fila condicional: solo aparece si hay un descuento real activo */}
            {cupónActivo && (
              <div className="d-flex justify-content-between mb-2 fs-6 text-success fw-bold">
                <span>Descuento ({cupónActivo}):</span>
                <span>-${montoDescuento.toLocaleString("es-AR")}</span>
              </div>
            )}

            <div className="d-flex justify-content-between mb-4 fs-5 border-top pt-2">
              <span>Total General:</span>
              <span className="fw-bold text-success">
                ${totalPrecio.toLocaleString("es-AR")}
              </span>
            </div>

            {/* SECCIÓN INTERACTIVA: Ingreso del Cupón Promocional */}
            <Form onSubmit={handleValidarCupon} className="mb-4 border-top pt-3">
              <Form.Label className="small fw-bold text-muted mb-2">
                ¿Tenés un cupón de descuento?
              </Form.Label>
              <InputGroup size="sm">
                <Form.Control
                  placeholder="Ej: LEER15"
                  value={codigoTexto}
                  onChange={(e) => setCodigoTexto(e.target.value)}
                  disabled={!!cupónActivo}
                  className="shadow-none"
                />
                <Button variant="dark" type="submit" disabled={!!cupónActivo}>
                  Aplicar
                </Button>
              </InputGroup>

              {alertaCupon.mensaje && (
                <div className={`small mt-2 fw-semibold d-flex align-items-center justify-content-between ${alertaCupon.esExito ? "text-success" : "text-danger"}`}>
                  <span>{alertaCupon.mensaje}</span>
                  {alertaCupon.esExito && (
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-danger p-0 fw-bold text-decoration-none"
                      onClick={handleRemoverTodoCupon}
                    >
                      (Remover)
                    </Button>
                  )}
                </div>
              )}
            </Form>

            <div className="d-grid gap-2">
              <Button
                as={Link}
                to="/contacto"
                state={{ desde: "carrito" }}
                variant="dark"
                size="lg"
                className="fw-bold py-2 fs-6"
              >
                Proceder al Checkout
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Carrito;
