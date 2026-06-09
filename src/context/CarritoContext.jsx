/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { productos as productosIniciales } from "../data/productos";
import toast from "react-hot-toast";

const CarritoContext = createContext();

// Diccionario de cupones válidos simulados (Código: Porcentaje de descuento)
const CUPONES_DISPONIBLES = {
  "BOOK10": 0.10,  // 10% de descuento
  "LEER15": 0.15,  // 15% de descuento
  "PROMO20": 0.20   // 20% de descuento
};

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("libreria_carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  const [listaProductos, setListaProductos] = useState(() => {
    const productosGuardados = localStorage.getItem("libreria_productos");
    return productosGuardados
      ? JSON.parse(productosGuardados)
      : productosIniciales;
  });

  // NUEVOS ESTADOS: Gestión de cupones promocionales
  const [cupónActivo, setCupónActivo] = useState(null);
  const [porcentajeDescuento, setPorcentajeDescuento] = useState(0);

  useEffect(() => {
    localStorage.setItem("libreria_carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem("libreria_productos", JSON.stringify(listaProductos));
  }, [listaProductos]);

  const agregarAlCarrito = (producto) => {
    const productoReal =
      listaProductos.find((p) => p.id === producto.id) || producto;

    if (productoReal.stock <= 0) {
      alert("Lo sentimos, este producto está agotado.");
      return;
    }
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe) {
        if (existe.cantidad >= productoReal.stock) {
          toast.error(`¡Llegaste al límite! Solo quedan ${productoReal.stock} ejemplares.`);;
          return prevCarrito;
        }
        toast(`"${productoReal.nombre}" — cantidad actualizada`, { icon: '🛒' });
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }
      toast.success(`"${productoReal.nombre}" agregado al carrito`)
      return [...prevCarrito, { ...productoReal, candy: 1, cantidad: 1 }];
    });
  };

  const modificarCantidad = (id, accion) => {
    const productoReal = listaProductos.find((p) => p.id === id);
    setCarrito((prevCarrito) =>
      prevCarrito
        .map((item) => {
          if (item.id === id) {
            if (accion === "sumar") {
              if (item.cantidad >= productoReal.stock) {
                toast.error(`Lo sentimos, no hay más de ${productoReal.stock} unidades.`);
                return item;
              }
              toast(`"${productoReal.nombre}" — cantidad actualizada`, { icon: '🛒' })
              return { ...item, cantidad: item.cantidad + 1 };
            } else {
              toast.success(`"${productoReal.nombre}" quitado del carrito`)
              return { ...item, cantidad: item.cantidad - 1 };
            }
          }
          return item;
        })
        .filter((item) => item.cantidad > 0),
    );
  };

  const registrarVentas = () => {
    setListaProductos((prevProductos) =>
      prevProductos.map((producto) => {
        const itemComprado = carrito.find((item) => item.id === producto.id);

        if (itemComprado) {
          return {
            ...producto,
            stock: producto.stock - itemComprado.cantidad,
            ventas: (producto.ventas || 0) + itemComprado.cantidad,
          };
        }
        return producto;
      }),
    );
    setCarrito([]);
    removerCupon(); // Limpia el cupón al finalizar la compra exitosamente
  };

  const eliminarProducto = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
    toast.success(`Producto quitado del carrito`)
  };

  const vaciarCarrito = () => {
    toast('Carrito vaciado', { icon: '🗑️' })
    setCarrito([]);
    removerCupon(); // Limpia el cupón si vacían la canasta
  };

  // FUNCIONES NUEVAS: Aplicar y remover cupones
  const aplicarCupon = (codigo) => {
    const codigoLimpio = codigo.toUpperCase().trim();
    if (CUPONES_DISPONIBLES[codigoLimpio]) {
      setCupónActivo(codigoLimpio);
      setPorcentajeDescuento(CUPONES_DISPONIBLES[codigoLimpio]);
      return { exito: true, mensaje: "¡Cupón aplicado correctamente! 🎉" };
    }
    return { exito: false, mensaje: "El cupón ingresado no es válido. ❌" };
  };

  const removerCupon = () => {
    setCupónActivo(null);
    setPorcentajeDescuento(0);
  };

  // CÁLCULOS MATEMÁTICOS ACTUALIZADOS
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotalPrecio = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const montoDescuento = subtotalPrecio * porcentajeDescuento;
  const totalPrecio = subtotalPrecio - montoDescuento;

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        listaProductos,
        agregarAlCarrito,
        modificarCantidad,
        eliminarProducto,
        vaciarCarrito,
        registrarVentas,
        totalItems,
        subtotalPrecio, // Expuesto para ver el desglose
        montoDescuento,  // Expuesto para ver la rebaja en la UI
        totalPrecio,     // Ahora viaja ya con el descuento aplicado
        cupónActivo,     // Expuesto para saber si hay un beneficio activo
        aplicarCupon,
        removerCupon,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context)
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return context;
};
