import { useMemo } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

const shuffle = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

function Inicio() {
  const { listaProductos } = useCarrito();

  const listaProductosSegura = useMemo(() => {
    return Array.isArray(listaProductos) ? listaProductos : [];
  }, [listaProductos]);

  const novedades = useMemo(() => {
    return [...listaProductosSegura].reverse().slice(0, 3);
  }, [listaProductosSegura]);

  const favoritos = useMemo(() => {
    return [...listaProductosSegura]
      .sort((a, b) => (b.ventas || 0) - (a.ventas || 0))
      .slice(0, 3);
  }, [listaProductosSegura]);

  const destacadosAleatorios = useMemo(() => {
    const disponibles = listaProductosSegura.filter((libro) => libro.stock > 0);
    return shuffle(disponibles).slice(0, 3);
  }, [listaProductosSegura]);

  return (
    <div
      className="py-3 text-start"
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <Container>
        {/* Bienvenida Institucional */}
        <div className="py-4 py-md-5 mb-4 mb-md-5 px-3 px-md-5 border-0 text-center" style={{ borderRadius: "4px" }}>
          <Row className="justify-content-center py-2">
            <Col xs={12} md={10} lg={9}>
              {/* RESPONSIVO: Se usaron clases fs-* dinámicas en vez de inline styles rígidos */}
              <h1 className="fw-light text-uppercase mb-3 fs-2 fs-md-1" style={{ letterSpacing: "1.5px", lineHeight: "1.3" }}>
                Biblioteca Virtual: <br className="d-none d-md-block" />
                <span className="fw-medium text-secondary d-block mt-2 fs-4 fs-md-3">
                  Donde las historias cobran vida
                </span>
              </h1>
              <p className="text-muted fw-light mb-0 mx-auto fs-6 fs-md-5" style={{ maxWidth: "720px", lineHeight: "1.7" }}>
                Libros de poesía, filosofía, narrativa, crítica literaria, arte
                y ensayo. Explorá nuestro catálogo online con stock actualizado
                y novedades editoriales diarias.
              </p>
            </Col>
          </Row>
        </div>

        {/* Carrusel de Libros Destacados */}
        {destacadosAleatorios.length > 0 && (
          <div className="mb-5 border-0 rounded-0 shadow-sm p-2 p-sm-3 p-md-4 bg-white">
            <div className="mb-2 border-bottom pb-2 px-2 px-md-4">
              <h2 className="fw-normal text-uppercase m-0 tracking-wider fs-4" style={{ letterSpacing: "1px" }}>
                Destacados de la Semana
              </h2>
            </div>

            <Carousel variant="dark" indicators={true} controls={true} className="pb-3">
              {destacadosAleatorios.map((libro, index) => (
                <Carousel.Item key={libro?.id ?? `destacado-${index}`} className="py-4 px-3 px-sm-4 px-md-5">
                  {/* RESPONSIVO: g-4 añade separación cuando las columnas se apilan en celulares */}
                  <Row className="align-items-center g-4">
                    {/* RESPONSIVO: xs={12} para celular (arriba) y md={4} para escritorio (al costado) */}
                    <Col xs={12} md={4} className="text-center">
                      <img
                        src={libro?.imagen || "https://via.placeholder.com/200x300?text=Sin+Imagen"}
                        alt={libro?.nombre || "Libro Destacado"}
                        style={{
                          maxHeight: "260px", // Reducido levemente para evitar overflow en pantallas chicas
                          width: "auto",
                          objectFit: "contain",
                        }}
                        className="shadow-sm img-fluid" // img-fluid evita desbordamientos
                      />
                    </Col>
                    {/* RESPONSIVO: xs={12} y md={8} */}
                    <Col xs={12} md={8} className="d-flex flex-column text-center text-md-start">
                      <span className="text-uppercase tracking-wider text-muted fw-semibold small mb-2" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>
                        Recomendación Editorial
                      </span>
                      <h3 className="fw-bold mb-1 fs-4 fs-md-3">
                        {libro?.nombre ? libro.nombre.toUpperCase() : "NOMBRE NO DISPONIBLE"}
                      </h3>
                      <p className="text-muted mb-3 fw-light fs-6 fs-md-5">
                        {libro?.autor || "Autor anónimo"}
                      </p>

                      {libro?.resenia ? (
                        <p className="text-secondary mb-4 fw-light small fs-md-6" style={{ maxWidth: "600px", lineHeight: "1.6", fontStyle: "italic" }}>
                          "{libro.resenia}"
                        </p>
                      ) : (
                        <p className="text-secondary mb-4 fw-light small fs-md-6" style={{ maxWidth: "600px", lineHeight: "1.6" }}>
                          Una pieza indispensable disponible en nuestro catálogo. Explorá sus páginas y descubrí una perspectiva única.
                        </p>
                      )}

                      {/* RESPONSIVO: justify-content-center en celular, justify-content-md-start en PC */}
                      <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 gap-sm-4 mt-2">
                        <span className="fw-bold text-dark fs-4 fs-md-3">
                          ${libro?.precio?.toLocaleString("es-AR") || "0"}
                        </span>
                        <Button
                          as={Link}
                          to={`/productos/${libro?.id}`}
                          variant="dark"
                          className="rounded-0 text-uppercase fw-semibold px-3 py-2 px-md-4"
                          style={{ fontSize: "0.85rem" }}
                        >
                          Comprar Destacado
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        )}

        {/* Novedades */}
        {novedades.length > 0 && (
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-baseline mb-4 border-bottom pb-2">
              <h2 className="fw-normal text-uppercase m-0 tracking-wider text-dark fs-4" style={{ letterSpacing: "1px" }}>
                Novedades
              </h2>
              <Link to="/productos" className="text-muted text-decoration-none small text-uppercase fw-semibold" style={{ fontSize: "0.8rem" }}>
                Ver Catálogo Completar →
              </Link>
            </div>

            <Row className="g-4">
              {novedades.map((libro, index) => (
                <Col key={libro?.id ?? `novedad-${index}`} xs={12} sm={6} md={4} lg={4}>
                  <Card className="h-100 border-0 rounded-0 shadow-sm bg-white">
                    <div className="text-center p-4" style={{ height: "260px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Card.Img
                        variant="top"
                        src={libro?.imagen || "https://via.placeholder.com/150x220?text=Sin+Imagen"}
                        style={{ maxHeight: "100%", width: "auto", objectFit: "contain" }}
                      />
                    </div>
                    <Card.Body className="d-flex flex-column pt-2 px-3 pb-3">
                      <Card.Title className="fw-bold text-dark text-truncate mb-1 fs-6">
                        {libro?.nombre ? libro.nombre.toUpperCase() : "NOMBRE NO DISPONIBLE"}
                      </Card.Title>
                      <Card.Text className="text-muted small mb-3 user-select-none">
                        {libro?.autor || "Autor anónimo"}
                      </Card.Text>

                      <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                        <span className="fw-bold text-dark fs-5">
                          ${libro?.precio?.toLocaleString("es-AR") || "0"}
                        </span>
                        <Button
                          as={Link}
                          to={`/productos/${libro?.id}`}
                          variant="outline-dark"
                          size="sm"
                          className="rounded-0 text-uppercase fw-semibold px-3"
                          style={{ fontSize: "0.75rem" }}
                        >
                          Comprar
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* Nuestros Favoritos */}
        {favoritos.length > 0 && (
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-baseline mb-4 border-bottom pb-2">
              <h2 className="fw-normal text-uppercase m-0 tracking-wider text-dark fs-4" style={{ letterSpacing: "1px" }}>
                Nuestros Favoritos
              </h2>
            </div>

            <Row className="g-4">
              {favoritos.map((libro, index) => (
                <Col key={libro?.id ?? `favorito-${index}`} xs={12} sm={6} md={4} lg={4}>
                  <Card className="h-100 border-0 rounded-0 shadow-sm bg-white">
                    <div className="text-center p-4" style={{ height: "260px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Card.Img
                        variant="top"
                        src={libro?.imagen || "https://via.placeholder.com/150x220?text=Sin+Imagen"}
                        style={{ maxHeight: "100%", width: "auto", objectFit: "contain" }}
                      />
                    </div>
                    <Card.Body className="d-flex flex-column pt-2 px-3 pb-3">
                      <Card.Title className="fw-bold text-dark text-truncate mb-1 fs-6">
                        {libro?.nombre ? libro.nombre.toUpperCase() : "NOMBRE NO DISPONIBLE"}
                      </Card.Title>
                      <Card.Text className="text-muted small mb-3">
                        {libro?.autor || "Autor anónimo"}
                      </Card.Text>

                      <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                        <span className="fw-bold text-dark fs-5">
                          ${libro?.precio?.toLocaleString("es-AR") || "0"}
                        </span>
                        <Button
                          as={Link}
                          to={`/productos/${libro?.id}`}
                          variant="outline-dark"
                          size="sm"
                          className="rounded-0 text-uppercase fw-semibold px-3"
                          style={{ fontSize: "0.75rem" }}
                        >
                          Comprar
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* Sobre Nuestra Librería */}
        <div className="py-5 border-top text-center text-md-start mt-5">
          {/* RESPONSIVO: g-4 añadido para dar un respiro entre texto y botón en celulares */}
          <Row className="align-items-center g-4">
            {/* RESPONSIVO: se agregó explicitamente xs={12} */}
            <Col xs={12} md={9}>
              <h3 className="fw-normal text-uppercase tracking-wider mb-3 fs-5" style={{ letterSpacing: "1px" }}>
                Sobre Nuestra Librería
              </h3>
              <p className="text-muted fw-light mb-0" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                Creemos en el libro como un objeto vivo y en la lectura como un
                acto de resistencia. Desde hace más de medio siglo, recorremos
                el universo de las letras para seleccionar páginas que
                conmueven, cuestionan e inspiran. Un puente de papel entre los
                grandes clásicos, la poesía emergente y una comunidad de
                lectores apasionados.
              </p>
            </Col>
            {/* RESPONSIVO: xs={12} y se quitó margen manual para usar el gap de Row */}
            <Col xs={12} md={3} className="text-center text-md-end">
              <Button
                as={Link}
                to="/nosotros"
                variant="outline-secondary"
                className="text-uppercase rounded-0 px-4 py-2 fw-semibold btn-sm w-auto"
              >
                Conocé nuestra historia
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Inicio;