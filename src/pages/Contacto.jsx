import { useState } from "react";
import { Container, Row, Col, Alert, Modal, Button } from "react-bootstrap";
import { useCarrito } from "../context/CarritoContext";
import { useNavigate, useLocation } from "react-router-dom";
import FormularioCompra from "../components/FormularioCompra";
import FormularioContacto from "../components/FormularioContacto";

function Contacto() {
  const { 
    carrito, 
    subtotalPrecio, 
    montoDescuento, 
    totalPrecio, 
    cupónActivo, 
    registrarVentas 
  } = useCarrito();
  
  // Hooks de navegación y estado para el modal
  const navigate = useNavigate();
  const location = useLocation();
// Se determina el modo de la página según el origen de navegación
  const modo = location.state?.desde === "carrito" ? "compra" : "contacto";
// Estado para controlar la visibilidad del modal, los datos del formulario y posibles errores
  const [mostrarModal, setMostrarModal] = useState(false);
  const [datosFormulario, setDatosFormulario] = useState(null);
  const [errorCarrito, setErrorCarrito] = useState("");
// Función para manejar el envío del formulario, validando el carrito si es una compra
  const handleProcesarEnvio = (datos) => {
    if (modo === "compra" && carrito.length === 0) {
      setErrorCarrito(
        "No podés confirmar la transacción porque tu carrito de compras está vacío.",
      );
      return;
    }
    setErrorCarrito("");
    setDatosFormulario(datos);
    setMostrarModal(true);
  };
// Función para manejar el cierre del modal y redirigir al inicio, registrando la venta si es una compra
  const handleFinalizarTransaccion = () => {
    setMostrarModal(false);
    if (modo === "compra") {
      registrarVentas();
    }
    navigate("/inicio");
  };

  return (
    <Container className="py-2 text-start">
      <div className="border-bottom mb-4 pb-3">
        <h2 className="fw-bold">
          {modo === "compra" ? "Finalizar Compra" : "Contacto y Soporte"}
        </h2>
        <p className="text-muted mb-0">
          {modo === "compra"
            ? "Completá tus datos de entrega para procesar la orden simulada."
            : "Escribinos tu consulta y un asesor te responderá a la brevedad."}
        </p>
      </div>

      <Row className="justify-content-center">
        <Col lg={8}>
          {modo === "compra" && errorCarrito && (
            <Alert variant="danger" className="fw-semibold">
              {errorCarrito}
            </Alert>
          )}

          {modo === "compra" ? (
            <FormularioCompra alEnviar={handleProcesarEnvio} />
          ) : (
            <FormularioContacto alEnviar={handleProcesarEnvio} />
          )}
        </Col>
      </Row>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title className="fw-bold fs-5">
            {modo === "compra"
              ? "🎉 ¡Compra Simulada con Éxito!"
              : "✉️ ¡Mensaje Enviado!"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <span className="display-4 d-block mb-3">
            {modo === "compra" ? "🎉📚" : "📬✨"}
          </span>
          <h4>
            ¡Muchas gracias, <strong>{datosFormulario?.nombre}</strong>!
          </h4>
          <p className="text-muted px-2 mt-2">
            {modo === "compra"
              ? "Tu orden simulada fue capturada perfectamente por las directivas del estado de React."
              : "Tu mensaje fue registrado correctamente en el sistema."}
          </p>

          <div className="bg-light p-3 rounded border text-start my-3 mx-2 small">
            <div className="mb-1">
              <strong>Nombre:</strong> {datosFormulario?.nombre}
            </div>
            <div className="mb-1">
              <strong>Email:</strong> {datosFormulario?.email}
            </div>
            <div className="mb-1">
              <strong>Teléfono:</strong> {datosFormulario?.telefono}
            </div>

            {modo === "compra" ? (
              <>
                <div className="mb-1">
                  <strong>Modalidad:</strong> {datosFormulario?.entrega}
                </div>
                {datosFormulario?.entrega === "Envío a domicilio" && (
                  <div className="mb-1">
                    <strong>Dirección:</strong> {datosFormulario?.direccion}
                  </div>
                )}
                
                <div className="mt-3 pt-2 border-top text-secondary d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>${subtotalPrecio.toLocaleString("es-AR")}</span>
                </div>
                
                {cupónActivo && (
                  <div className="text-success fw-semibold d-flex justify-content-between">
                    <span>Descuento ({cupónActivo}):</span>
                    <span>-${montoDescuento.toLocaleString("es-AR")}</span>
                  </div>
                )}

                <div className="mt-1 pt-1 border-top fw-bold text-dark fs-6 d-flex justify-content-between">
                  <span>Total pagado:</span>
                  <span>${totalPrecio.toLocaleString("es-AR")}</span>
                </div>
              </>
            ) : (
              <>
                <div className="mb-1">
                  <strong>Motivo:</strong> {datosFormulario?.tipo}
                </div>
                <div className="mt-2 pt-2 border-top text-muted text-truncate">
                  <strong>Mensaje:</strong> "{datosFormulario?.mensaje}"
                </div>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            variant="dark"
            onClick={handleFinalizarTransaccion}
            className="w-100 fw-bold py-2"
          >
            Volver a la Página de Inicio 🏠
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Contacto;
