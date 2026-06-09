import { useTheme } from '../context/ThemeContext'; // ajustá el path

function Desarrolladores() {
  const { darkMode } = useTheme();

  const integrantes = [
    { iniciales: "PP", nombre: "Pablo Perugini", color: "av-a" },
    { iniciales: "AO", nombre: "Ariel Oliva", color: "av-b" },
    { iniciales: "LL", nombre: "Luca Lafuente", color: "av-c" },
  ];

  return (
    <div className={`min-vh-100 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="container py-5 text-center">

        {/* Hero */}
        <p className={`text-uppercase fw-semibold mb-2 ${darkMode ? 'text-info' : 'text-muted'}`}
          style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
          Quiénes somos
        </p>
        <h1 className="fw-semibold mb-3" style={{ fontSize: "28px" }}>
          Estudiantes de la UNAHUR, apasionados por los libros y el código.
        </h1>
        <p className={`mx-auto mb-5 ${darkMode ? 'text-secondary' : 'text-muted'}`}
          style={{ maxWidth: "620px", lineHeight: "1.75", fontSize: "15px" }}>
          Somos un grupo de estudiantes de la Universidad Nacional de Hurlingham (UNAHUR)
          y este e-commerce de libros es nuestro primer trabajo práctico integrador.
          Lo desarrollamos con React y Bootstrap, aplicando los conceptos de desarrollo
          web que fuimos aprendiendo a lo largo de la cursada.
        </p>

        <hr className={darkMode ? 'border-secondary' : ''} />

        {/* Equipo */}
        <p className={`text-uppercase fw-semibold mt-4 mb-3 ${darkMode ? 'text-info' : 'text-muted'}`}
          style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
          El equipo
        </p>
        <div className="row g-3 mb-5 justify-content-center">
          {integrantes.map((i) => (
            <div className="col-6 col-md-3" key={i.iniciales}>
              <div className={`card text-center border p-3 h-100 ${darkMode ? 'bg-secondary bg-opacity-25 border-secondary text-white' : ''}`}>
                <div className={`avatar-circle mx-auto mb-2 ${i.color}`}>
                  {i.iniciales}
                </div>
                <p className="fw-semibold mb-0" style={{ fontSize: "14px" }}>{i.nombre}</p>
                <p className={`mb-0 ${darkMode ? 'text-secondary' : 'text-muted'}`} style={{ fontSize: "12px" }}>
                  Desarrollo frontend
                </p>
              </div>
            </div>
          ))}
        </div>

        <hr className={darkMode ? 'border-secondary' : ''} />

        {/* Info chips */}
        <div className="row g-3 mt-2 justify-content-center">
          {[
            { label: "Universidad", valor: "UNAHUR" },
            { label: "Trabajo práctico", valor: "TP Integrador N°1" },
            { label: "Tecnologías", valor: "React + Bootstrap" },
            { label: "Año", valor: "2026" },
          ].map((item) => (
            <div className="col-6 col-md-3" key={item.label}>
              <div className={`rounded p-3 ${darkMode ? 'bg-secondary bg-opacity-25' : 'bg-light border'}`}>
                <p className={`text-uppercase fw-semibold mb-1 ${darkMode ? 'text-info' : 'text-muted'}`}
                  style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
                  {item.label}
                </p>
                <p className="fw-semibold mb-0" style={{ fontSize: "14px" }}>{item.valor}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Desarrolladores;