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
    <section className="hero">

      <div className="overlay">

        <div className="container">

          <div className="row align-items-center min-vh-100">

            <div className="col-lg-6 text-white">

              <h1 className="display-2 fw-bold">
                Comer saludable nunca fue tan fácil
              </h1>

              <p className="lead mt-4">
                Descubre menús saludables preparados por expertos y entregados directamente hasta tu hogar.
              </p>

            </div>

            <div className="col-lg-5 offset-lg-1">

              <div className="card shadow-lg p-4 rounded-4">

                <h2 className="text-center mb-4">
                  Iniciar sesión
                </h2>

                <form onSubmit={iniciarSesion}>

                  <div className="mb-3">

                    <label className="form-label">
                      Correo electrónico
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="correo@ejemplo.com"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />

                  </div>

                  <div className="mb-3">

                    <label className="form-label">
                      Contraseña
                    </label>

                    <input
                      type="password"
                      className="form-control"
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
                    className="btn btn-success w-100"
                  >
                    Entrar
                  </button>

                  <p className="text-center mt-4">

                    ¿No tienes cuenta?

                    <Link
                      to="/register"
                      className="text-success ms-2 text-decoration-none"
                    >
                      Registrarse
                    </Link>

                  </p>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;