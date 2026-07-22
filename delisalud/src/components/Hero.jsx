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
    <section className="container-fluid p-0 m-0 min-vh-100 overflow-hidden">
      <div className="row g-0 min-vh-100">

        <div className="col-lg-5 bg-white d-flex align-items-center justify-content-center px-4 px-md-5">

          <div className="w-100" style={{ maxWidth: "450px" }}>

            <div className="text-center mb-5">
              <h1 className="fw-bold display-4 text-success mb-2">
                DeliSalud
              </h1>

              <p className="text-muted fs-5">
                Comida saludable, rápida y a tu puerta
              </p>
            </div>

            <h2 className="fw-bold text-center mb-4">
              Iniciar sesión
            </h2>

            <form onSubmit={iniciarSesion}>

              <div className="mb-3">
                <label className="form-label">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="correo@ejemplo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Contraseña
                </label>

                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="••••••••"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
              </div>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="recordarme"
                />

                <label
                  className="form-check-label"
                  htmlFor="recordarme"
                >
                  Recordarme
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 py-3 fw-bold"
              >
                Entrar
              </button>

              <p className="text-center mt-4">
                ¿No tienes cuenta?

                <Link
                  to="/register"
                  className="text-success ms-2 fw-bold text-decoration-none"
                >
                  Registrarse
                </Link>
              </p>

            </form>

          </div>

        </div>

        <div className="col-lg-7 d-none d-lg-block position-relative">

          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            alt="Comida saludable"
            className="w-100 h-100"
            style={{
              objectFit: "cover",
              position: "absolute",
              inset: 0
            }}
          />

          <div
            className="position-absolute bottom-0 start-50 translate-middle-x text-center text-white pb-5"
            style={{
              width: "85%",
              textShadow: "2px 2px 8px rgba(0,0,0,0.8)"
            }}
          >

            <h2 className="display-4 fw-bold mb-3 text-white">
              Comer saludable nunca fue tan fácil
            </h2>

            <p
              className="fs-4 text-white"
              style={{
                maxWidth: "700px",
                margin: "0 auto"
              }}
            >
              Descubre menús saludables preparados con ingredientes frescos,
              equilibrados y entregados directamente hasta tu hogar.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;