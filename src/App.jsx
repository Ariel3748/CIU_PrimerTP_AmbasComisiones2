import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import { ThemeProvider } from "./context/ThemeContext"; // <- Asegúrate de que esta ruta sea correcta
import { Toaster } from 'react-hot-toast';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Bienvenida from "./pages/Bienvenida";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Desarrolladores from "./pages/Desarrolladores"; 
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros"; 
import Error404 from "./pages/Error404";

// Este componente reacciona automáticamente a cada cambio de página
function LayoutContenido({ children }) {
  const location = useLocation();
  const esBienvenida = location.pathname === "/";

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Si NO es la bienvenida, muestra el NavBar */}
      {!esBienvenida && <NavBar />}

      <main className={esBienvenida ? "" : "container flex-grow-1 py-4"}>
        {children}
      </main>

      {/* Si NO es la bienvenida, muestra el Footer */}
      {!esBienvenida && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CarritoProvider>
        <BrowserRouter>
          <LayoutContenido>
            <Toaster position="bottom-right" />
            <Routes>
              <Route path="/" element={<Bienvenida />} />
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/:id" element={<DetalleProducto />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/desarrolladores" element={<Desarrolladores />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </LayoutContenido>
        </BrowserRouter>
      </CarritoProvider>
    </ThemeProvider>
  );
}

export default App;
