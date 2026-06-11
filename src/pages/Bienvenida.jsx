import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Bienvenida() {
  // Hook de navegación para redirigir al usuario al hacer clic en el botón
  const navigate = useNavigate();
// Estilos para el fondo de pantalla completa con la imagen y el overlay oscuro
  const fondoFullStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://img.freepik.com/fotos-premium/explorando-impresionante-biblioteca-long-room-dublin-sus-altas-estanterias-hermoso-interior-madera_1275033-1979.jpg?semt=ais_hybrid&w=740&q=80')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh", 
    width: "100%",      
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    overflowY: "auto",  
  };

  return (
    <div style={fondoFullStyle} className="pantalla-bienvenida text-center px-2">
      <Container className="d-flex flex-column align-items-center justify-content-center">
        <div
          className="py-4 py-md-5 px-3 rounded-3 w-100"
          style={{ backdropFilter: "blur(3px)", maxWidth: "750px" }}
        >
          <span
            className="text-uppercase fw-bold mb-2 d-block fs-6"
            style={{ letterSpacing: "3px" }}
          >
            Bienvenidos a
          </span>
          
          <h1
            className="fs-2 fs-md-1 display-md-2 fw-bold mb-4 text-uppercase tracking-tight"
            style={{ letterSpacing: "1px", lineHeight: "1.2" }}
          >
            Biblioteca Virtual 📚
          </h1>
          
          <p
            className="fs-5 fs-md-4 fw-light mb-4 mb-md-5 mx-auto"
            style={{ maxWidth: "600px", lineHeight: "1.6" }}
          >
            Tu próximo capítulo te está esperando. Descubrí nuestro amplio
            catálogo con las mejores historias, clásicos y novedades.
          </p>
          
          <div className="d-block mt-3">
            <Button
              variant="light"
              className="fw-bold px-4 py-3 px-md-5 shadow-lg text-uppercase fs-6 fs-md-5 position-relative btn-bienvenida-claro"
              style={{ 
                borderRadius: "50px", 
                transition: "transform 0.2s",
                zIndex: 10000 
              }}
              onClick={() => navigate("/inicio")}
            >
              Ingresar a la Tienda ➔
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Bienvenida;