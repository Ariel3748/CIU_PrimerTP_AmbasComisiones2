import { useState } from "react";

/**
 * Hook personalizado para gestionar el estado y validación de formularios.
 * @param {Object} valoresIniciales - Objeto con los campos del formulario.
 * @param {Function} validarCampos - Función que retorna un objeto de errores.
 */
export default function useForm(valoresIniciales, validarCampos) {
  const [datos, setDatos] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [tocado, setTocado] = useState({});

  // Maneja el cambio de los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevosDatos = { ...datos, [name]: value };

    setDatos(nuevosDatos);

    // Si cambia el método de entrega, limpiamos la dirección por accesibilidad y UX
    if (name === "entrega" && value === "Retiro en sucursal") {
      nuevosDatos.direccion = "";
      setDatos(nuevosDatos);
    }

    if (validarCampos) {
      setErrores(validarCampos(nuevosDatos));
    }
  };

  // Detecta cuándo el usuario sale del input (onBlur) para marcarlo como "tocado"
  const handleBlur = (e) => {
    const { name } = e.target;
    setTocado({ ...tocado, [name]: true });

    if (validarCampos) {
      setErrores(validarCampos(datos));
    }
  };

  // Fuerza la validación de todo el formulario al intentar hacer el submit
  const validarFormularioCompleto = () => {
    if (validarCampos) {
      const validaciones = validarCampos(datos);
      setErrores(validaciones);

      const todosTocados = Object.keys(datos).reduce((acc, llave) => {
        acc[llave] = true;
        return acc;
      }, {});
      setTocado(todosTocados);

      return Object.keys(validaciones).length > 0;
    }
    return false;
  };

  return {
    datos,
    errores,
    tocado,
    handleChange,
    handleBlur,
    validarFormularioCompleto,
    setDatos,
    setErrores,
  };
}
