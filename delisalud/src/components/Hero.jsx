import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Hero.css";

function Hero() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function iniciarSesion(e) {
    e.preventDefault();
    if (correo.trim() === "" || contrasena.trim() === "") {
      setError("Debe completar todos los campos.");
      return;
    }
    setError("");
    setCorreo("");
    setContrasena("");
    navigate("/home");
  }

  return (
    <section className="container-fluid p-0 m-0 vh-100 overflow-hidden hero">
      <div className="row g-0 h-100 w-100">
        
        {/* LADO IZQUIERDO: Formulario (Fondo Blanco, ocupa toda la altura) */}
        <div className="col-lg-5 bg-white d-flex flex-column justify-content-center px-4 px-md-5 h-100">
          <div className="w-100 mx-auto" style={{ maxWidth: "450px" }}>
            
            {/* Logotipo/Encabezado móvil y de escritorio */}
            <div className="text-center mb-5">
              <h1 className="fw-bold display-4 text-success mb-1">DeliSalud</h1>
              <p className="text-muted fs-5">Comida saludable, rápida y a tu puerta</p>
            </div>

            <h2 className="text-black fw-bold fs-2 mb-4 text-center text-lg-start">
              Iniciar sesión
            </h2>
            
            <form onSubmit={iniciarSesion}>
              <div className="mb-3">
                <label className="form-label text-black fw-medium">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg bg-light"
                  placeholder="correo@ejemplo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-black fw-medium">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg bg-light"
                  placeholder="••••••••"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
              </div>

              {error && <div className="alert alert-danger p-2 fs-6">{error}</div>}

              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" id="recordarme" />
                <label className="form-check-label text-black" htmlFor="recordarme">
                  Recordarme
                </label>
              </div>

              <button type="submit" className="btn btn-success w-100 py-3 fs-5 fw-bold shadow-sm">
                Entrar
              </button>

              <p className="text-center mt-4 mb-0 text-black">
                ¿No tienes cuenta?
                <Link to="/register" className="text-success ms-2 fw-bold text-decoration-none">
                  Registrarse
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* LADO DERECHO: Imagen de fondo completo (Oculta en pantallas pequeñas) */}
        <div className="col-lg-7 d-none d-lg-block position-relative h-100">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            alt="Comida saludable"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
          {/* Texto superpuesto elegante sobre la imagen */}
          <div 
            className="position-absolute bottom-0 start-0 w-100 p-5 text-white"
            style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
          >
            <h3 className="fw-bold display-6 mb-2">Comer saludable nunca fue tan fácil</h3>
            <p className="fs-5 opacity-90 mb-0">
              Descubre menús saludables preparados con ingredientes frescos, equilibrados y entregados directamente hasta tu hogar.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
