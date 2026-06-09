/* eslint-disable no-undef */
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoLibreria from "../assets/libreriaOnline.png";
import { useCarrito } from "../context/CarritoContext";
import { useTheme } from "../context/ThemeContext";

function NavBar() {
  const { totalItems } = useCarrito();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="sticky-top shadow-sm py-1"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/inicio"
          className="fw-bold fs-4 text-uppercase d-flex align-items-center gap-2"
        >
          <img
            src={logoLibreria}
            alt="Logo Biblioteca Virtual"
            style={{ height: "70px", width: "auto", objectFit: "contain" }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <span>Biblioteca Virtual</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={Link}
              to="/inicio"
              className="fw-semibold px-3 navbar-link-custom"
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/productos"
              className="fw-semibold px-3 navbar-link-custom"
            >
              Libros
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contacto"
              state={{ desde: "navbar" }}
              className="fw-semibold px-3 navbar-link-custom"
            >
              Contacto
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/desarrolladores"
              state={{ desde: "navbar" }}
              className="fw-semibold px-3 navbar-link-custom"
            >
              Desarrolladores
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/carrito"
              className="fw-semibold px-3 ms-lg-2 position-relative navbar-link-custom"
            >
              🛒 Mi Carrito
              {totalItems > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ marginTop: "5px" }}
                >
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>

            <button
              onClick={toggleTheme}
              className="btn btn-outline-light btn-sm ms-lg-3 mt-2 mt-lg-0"
            >
              {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;