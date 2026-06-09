import { useTheme } from '../context/ThemeContext'; 

function Nosotros() {
  const { darkMode } = useTheme();

  const caracteristicas = [
    { label: "Fundación", valor: "2010" },
    { label: "Libros disponibles", valor: "+5.000" },
    { label: "Categorías", valor: "24" },
    { label: "Envíos", valor: "Todo el país" },
  ];

  return (
    <div className={`min-vh-100 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="container py-5">

        {/* Hero */}
        <div className="text-center mb-5">
          <p className={`text-uppercase fw-semibold mb-2 ${darkMode ? 'text-info' : 'text-muted'}`}
            style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
            Nuestra historia
          </p>
          <h1 className="fw-semibold mb-3" style={{ fontSize: "32px" }}>
            📚 Página & Letras
          </h1>
          <p className={`mx-auto ${darkMode ? 'text-secondary' : 'text-muted'}`}
            style={{ maxWidth: "600px", lineHeight: "1.8", fontSize: "15px" }}>
            Somos una librería independiente fundada en 2010 en el corazón de Buenos Aires.
            Nació del sueño de dos amigos lectores que querían un lugar donde cada libro
            tuviera su lector, y cada lector encontrara su libro. Hoy, más de 16 años después,
            seguimos eligiendo con cuidado cada título de nuestro catálogo.
          </p>
        </div>

        <hr className={darkMode ? 'border-secondary' : ''} />

        {/* Misión y visión */}
        <div className="row g-4 my-4 text-center">
          <div className="col-md-6">
            <div className={`rounded p-4 h-100 ${darkMode ? 'bg-secondary bg-opacity-25' : 'bg-white border'}`}>
              <div style={{ fontSize: "32px" }} className="mb-2">🎯</div>
              <h5 className="fw-semibold mb-2">Nuestra misión</h5>
              <p className={`mb-0 ${darkMode ? 'text-secondary' : 'text-muted'}`} style={{ fontSize: "14px", lineHeight: "1.7" }}>
                Acercar la lectura a todas las personas, ofreciendo un catálogo diverso,
                precios justos y una experiencia de compra simple y cercana.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className={`rounded p-4 h-100 ${darkMode ? 'bg-secondary bg-opacity-25' : 'bg-white border'}`}>
              <div style={{ fontSize: "32px" }} className="mb-2">🌱</div>
              <h5 className="fw-semibold mb-2">Nuestra visión</h5>
              <p className={`mb-0 ${darkMode ? 'text-secondary' : 'text-muted'}`} style={{ fontSize: "14px", lineHeight: "1.7" }}>
                Ser la librería de referencia en Argentina para lectores curiosos que buscan
                algo más que best-sellers: libros que dejan huella.
              </p>
            </div>
          </div>
        </div>

        <hr className={darkMode ? 'border-secondary' : ''} />

        {/* Stats */}
        <div className="row g-3 my-4 justify-content-center text-center">
          {caracteristicas.map((item) => (
            <div className="col-6 col-md-3" key={item.label}>
              <div className={`rounded p-3 ${darkMode ? 'bg-secondary bg-opacity-25' : 'bg-white border'}`}>
                <p className={`text-uppercase fw-semibold mb-1 ${darkMode ? 'text-info' : 'text-muted'}`}
                  style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
                  {item.label}
                </p>
                <p className="fw-bold mb-0" style={{ fontSize: "22px" }}>{item.valor}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className={darkMode ? 'border-secondary' : ''} />

        {/* Valores */}
        <div className="text-center mt-4">
          <p className={`text-uppercase fw-semibold mb-3 ${darkMode ? 'text-info' : 'text-muted'}`}
            style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
            Lo que nos define
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {["Curaduría independiente", "Envío a todo el país", "Atención personalizada",
              "Libros en español y otros idiomas", "Ediciones especiales", "Club de lectura mensual"].map((v) => (
              <span key={v}
                className={`badge rounded-pill px-3 py-2 ${darkMode ? 'bg-secondary text-white' : 'bg-light text-dark border'}`}
                style={{ fontSize: "13px", fontWeight: "500" }}>
                {v}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Nosotros;