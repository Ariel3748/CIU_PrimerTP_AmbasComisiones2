import { Form, Button, Row, Col } from "react-bootstrap";
import useForm from "../hooks/useForm";

const valoresIniciales = {
  nombre: "",
  email: "",
  telefono: "",
  entrega: "Retiro en sucursal",
  direccion: "",
};
// Función de validación que recibe los valores del formulario y devuelve un objeto con los errores encontrados
const validar = (valores) => {
  const errores = {};
  if (!valores.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
  if (!valores.email.trim()) {
    errores.email = "El correo electrónico es obligatorio.";
  } else if (!/\S+@\S+\.\S+/.test(valores.email)) {
    errores.email = "El formato de correo no es válido.";
  }
  
  // VALIDACIÓN OPTIMIZADA: Permite números, espacios, guiones y el '+'
  if (!valores.telefono.trim()) {
    errores.telefono = "El teléfono es requerido.";
  } else if (!/^[0-9\s+-]+$/.test(valores.telefono)) {
    errores.telefono = "Debe ser un número telefónico válido.";
  }

  if (valores.entrega === "Envío a domicilio" && !valores.direccion.trim()) {
    errores.direccion = "La dirección de envío es obligatoria.";
  }
  return errores;
};
// Componente de formulario de compra que utiliza el hook useForm para manejar el estado y la validación del formulario
export default function FormularioCompra({ alEnviar }) {
  const {
    datos,
    errores,
    tocado,
    handleChange,
    handleBlur,
    validarFormularioCompleto,
  } = useForm(valoresIniciales, validar);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tieneErrores = validarFormularioCompleto();
    if (!tieneErrores) {
      alEnviar(datos);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="p-3 p-md-4 border rounded shadow-sm bg-white"
    >
      <h5 className="fw-bold mb-3 border-bottom pb-2">Datos del Comprador</h5>

      <Form.Group className="mb-3">
        <Form.Label className="small fw-semibold">Nombre Completo</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={datos.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={tocado.nombre && !!errores.nombre}
          placeholder="Ej: Carlos Gómez"
        />
        <Form.Control.Feedback type="invalid">
          {errores.nombre}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col xs={12} md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={datos.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={tocado.email && !!errores.email}
              placeholder="carlos@ejemplo.com"
            />
            <Form.Control.Feedback type="invalid">
              {errores.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold">
              Teléfono de contacto
            </Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={datos.telefono}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={tocado.telefono && !!errores.telefono}
              placeholder="Ej: +54 11 2345 6789"
            />
            <Form.Control.Feedback type="invalid">
              {errores.telefono}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <h5 className="fw-bold mb-3 border-bottom pb-2 mt-2">
        Modalidad de Entrega
      </h5>

      <Form.Group className="mb-3">
        <div className="mb-2 d-block d-sm-inline-block me-sm-4">
          <Form.Check
            type="radio"
            label="Retiro en sucursal (Gratis)"
            name="entrega"
            value="Retiro en sucursal"
            checked={datos.entrega === "Retiro en sucursal"}
            onChange={handleChange}
            id="entrega-retiro"
          />
        </div>
        <div className="d-block d-sm-inline-block">
          <Form.Check
            type="radio"
            label="Envío a domicilio"
            name="entrega"
            value="Envío a domicilio"
            checked={datos.entrega === "Envío a domicilio"}
            onChange={handleChange}
            id="entrega-envio"
          />
        </div>
      </Form.Group>

      {datos.entrega === "Envío a domicilio" && (
        <Form.Group className="mb-3">
          <Form.Label className="small fw-semibold">
            Dirección Completa de Envío
          </Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            value={datos.direccion}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={tocado.direccion && !!errores.direccion}
            placeholder="Calle, Número, Localidad, Código Postal"
          />
          <Form.Control.Feedback type="invalid">
            {errores.direccion}
          </Form.Control.Feedback>
        </Form.Group>
      )}

      <Button type="submit" variant="dark" className="w-100 fw-bold py-2 mt-2 rounded-0 text-uppercase">
        Finalizar Compra 🛒
      </Button>
    </Form>
  );
}