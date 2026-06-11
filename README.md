# Librería Digital - Tienda de Libros Online

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black&style=flat-square)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vite.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?logo=bootstrap&logoColor=white&style=flat-square)](https://getbootstrap.com/)

Una plataforma web interactiva y responsiva desarrollada bajo el ecosistema de **React**, diseñada para simular la experiencia de usuario (*UX*) de un comercio electrónico literario de alto rendimiento. 

La aplicación resuelve de forma nativa la arquitectura de componentes modulares, implementando flujos complejos como la gestión de stock en tiempo real mediante estados globales, persistencia de datos en el cliente, algoritmos de ordenamiento/filtrado dinámico y validación heurística de formularios de checkout.

---

## Tecnologías y Conceptos Utilizados

### Tecnologías Core & Librerías
* **React 18** (con **Vite** como entorno de desarrollo rápido y empaquetador).
* **React Router DOM** (Gestión de enrutamiento dinámico, paso de estados entre pantallas mediante `useLocation`, captura de parámetros de URL con `useParams` y redirecciones controladas con `useNavigate`).
* **React-Bootstrap** (Componentes de interfaz de usuario y sistema de grillas responsivas para adaptabilidad en celulares, tablets y escritorio).

### Gestión de Estado Global (Context API)
* **`CarritoContext`**: Centraliza la persistencia de los productos, actualiza dinámicamente las unidades de stock en tiempo real y gestiona el flujo de compra.
* **`ThemeContext`**: Administra de forma global la identidad visual de la aplicación.

### Hooks Personalizados (Custom Hooks)
* **`useForm`**: Diseñado desde cero para automatizar el ciclo de vida de los formularios estructurando los estados de `datos`, `errores` y `tocado`.

### Optimización de Rendimiento y Algoritmos
* **`useMemo`**: Utilizado estratégicamente para memorizar costosas operaciones de filtrado (búsqueda por texto y categorías sin duplicados usando estructuras `Set`) y ordenamiento de arrays de datos.
* **Algoritmo Shuffle (Fisher-Yates)**: Implementado de manera nativa para generar la aleatoriedad de los libros destacados de la sección de inicio de forma eficiente sin romper la inmutabilidad de los estados de React.

### Arquitectura de Componentes y Props (Propiedades)
* **Pasaje de datos unidireccional**: Flujo de información estructurado donde los componentes de páginas (`Productos`, `Carrito`, `Contacto`) transfieren estados a componentes atómicos y reutilizables mediante `props`.
* **Props dinámicas**: Implementadas en `CarritoItem` y `ProductoCard` para controlar botones de compra, badges y desgloses de subtotales.
* **Inyección de funciones de Callback**: Uso de `props` funcionales (como `alEnviar` en los formularios) para comunicar eventos desde componentes hijos hacia los componentes padres.

---

## Características Destacadas e Implementación de Opcionales

Para superar los requerimientos mínimos de la consigna, el grupo integró las siguientes funcionalidades de la lista de **Extras Opcionales**:

1. ** Persistencia con LocalStorage:** El carrito de compras y el listado general de productos persisten de manera local. Si se recarga la página, los elementos agregados y las modificaciones de stock no se pierden.

2. ** Modo Claro / Oscuro (Dark Mode):** Sincronizado globalmente mediante un contexto, inyectando clases dinámicas directamente en el `document.body` y guardando la preferencia del usuario en el navegador.

3. ** Sistema de Etiquetas Especiales:** Renderizado dinámico de Badges condicionales como *"Novedades"*, *"Favoritos / Más vendidos"* y *"Destacados"* basados en el volumen de ventas simulado del producto.

4. ** Cupones Promocionales Activos:** Lógica matemática integrada en el carrito para procesar códigos de descuento válidos (`BOOK10`, `LEER15`, `PROMO20`) afectando directamente al desglose de la UI (Subtotal ➔ Descuento ➔ Total).

5. ** Sección Institucional "Nosotros":** Una página dedicada a presentar la identidad del emprendimiento, su historia y sus métricas de negocio.

6. ** Sección de "Desarrolladores":** Espacio personalizado para listar el equipo de trabajo encargado de la interfaz.

---

##  Instalación y Ejecución Local

Seguí estos pasos para clonar el repositorio y ejecutar el proyecto en tu entorno de desarrollo:

### 1. Clonar el repositorio
BASH: 
git clone: https://github.com/Ariel3748/CIU_PrimerTP_AmbasComisiones2.git

### 2. Ingresar a la carpeta del proyecto
BASH: 
cd "Tienda-Online-en-React"

(Nota: Si descargaste el archivo o estás en una ruta local específica, asegurate de abrir la terminal dentro de la raíz de la carpeta del proyecto antes de continuar).

### 3. Instalar las dependencias
BASH: 
npm install

### 4. Iniciar el servidor con Vite
BASH: 
npm run dev

El servidor web local se levantará de forma automática en tu navegador predeterminado bajo la dirección http://localhost:5173 gracias a la directiva server.open configurada en Vite.

---

## Integrantes del Grupo

Pablo Christian Perugini - [GitHub Profile](https://github.com/PabloPerugini)

Ariel Oliva - [GitHub Profile](https://github.com/Ariel3748)

Luca La Fuente - [GitHub Profile](https://github.com/LucaLaFuente)

---

## Capturas de Pantalla

![alt text](<Captura de pantalla 2026-06-09 150904.png>) ![alt text](<Captura de pantalla 2026-06-09 151710.png>) ![alt text](<Captura de pantalla 2026-06-09 151730.png>) ![alt text](<Captura de pantalla 2026-06-09 151742.png>) ![alt text](<Captura de pantalla 2026-06-09 151802.png>) ![alt text](<Captura de pantalla 2026-06-09 151833.png>) ![alt text](<Captura de pantalla 2026-06-09 151857.png>) ![alt text](<Captura de pantalla 2026-06-09 154613.png>)

---

## Presentación de Canva

[text](https://canva.link/jfzwm3s1l3c0iqp)

---

## Link al Deploy

El proyecto se encuentra optimizado, compilado y desplegado de manera pública para su testeo online:

[Ver el proyecto en vivo aquí](https://ciuprimerparcial2026.netlify.app/) 

