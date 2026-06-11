import { Form, Button } from "react-bootstrap";
import useForm from "../hooks/useForm";

const valoresIniciales = {
  nombre: "",
  email: "",
  telefono: "",
  tipo: "Consulta General",
  mensaje: "",
};
// Función de validación que recibe los valores del formulario y devuelve un objeto con los errores encontrados
const validar = (valores) => {
  const errores = {};
  if (!valores.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
  if (!valores.email.trim()) {
    errores.email = "El correo es obligatorio.";
  } else if (!/\S+@\S+\.\S+/.test(valores.email)) {
    errores.email = "El formato de correo no es válido.";
  }
  if (!valores.mensaje.trim()) {
    errores.mensaje = "Por favor, escribí un mensaje.";
  } else if (valores.mensaje.length < 10) {
    errores.mensaje = "El mensaje debe tener al menos 10 caracteres.";
  }
  return errores;
};
// Componente de formulario de contacto que utiliza el hook useForm para manejar el estado y la validación del formulario
export default function FormularioContacto({ alEnviar }) {
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
      <h5 className="fw-bold mb-3 border-bottom pb-2">Dejanos tu Mensaje</h5>

      <Form.Group className="mb-3">
        <Form.Label className="small fw-semibold">Nombre Completo</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={datos.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={tocado.nombre && !!errores.nombre}
          placeholder="Ej: María Luz"
        />
        <Form.Control.Feedback type="invalid">
          {errores.nombre}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="small fw-semibold">
          Correo Electrónico
        </Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={datos.email}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={tocado.email && !!errores.email}
          placeholder="maria@ejemplo.com"
        />
        <Form.Control.Feedback type="invalid">
          {errores.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="small fw-semibold">
          Motivo del contacto
        </Form.Label>
        <Form.Select name="tipo" value={datos.tipo} onChange={handleChange}>
          <option value="Consulta General">Consulta General</option>
          <option value="Soporte con un Pedido">Soporte con un Pedido</option>
          <option value="Sugerencia / Reclamo">Sugerencia / Reclamo</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="small fw-semibold">Mensaje</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="mensaje"
          value={datos.mensaje}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={tocado.mensaje && !!errores.mensaje}
          placeholder="Escribí detalladamente tu consulta..."
        />
        <Form.Control.Feedback type="invalid">
          {errores.mensaje}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="dark" className="w-100 fw-bold py-2 rounded-0 text-uppercase">
        Enviar Mensaje ✉️
      </Button>
    </Form>
  );
}
