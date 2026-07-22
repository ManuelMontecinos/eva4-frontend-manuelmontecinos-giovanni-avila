import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmarPassword: "",
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validarFormulario = () => {

    let nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!correoRegex.test(formData.correo)) {
      nuevosErrores.correo = "Ingrese un correo válido.";
    }

    if (!formData.password) {
      nuevosErrores.password = "La contraseña es obligatoria.";
    }

    if (!formData.confirmarPassword) {
      nuevosErrores.confirmarPassword =
        "Debe confirmar la contraseña.";
    } else if (formData.password !== formData.confirmarPassword) {
      nuevosErrores.confirmarPassword =
        "Las contraseñas no coinciden.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (validarFormulario()) {

      setFormData({
        nombre: "",
        correo: "",
        password: "",
        confirmarPassword: "",
      });

      setErrores({});

      navigate("/");

      // Si tu Login está en "/login"
      // cambia la línea anterior por:
      // navigate("/login");

    }

  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-md-6">

            <div className="card shadow p-4">

              <h2 className="text-center mb-4">
                Crear Cuenta
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Nombre
                  </label>

                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={formData.nombre}
                    onChange={handleChange}
                  />

                  {errores.nombre && (
                    <small className="text-danger">
                      {errores.nombre}
                    </small>
                  )}

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    name="correo"
                    className="form-control"
                    value={formData.correo}
                    onChange={handleChange}
                  />

                  {errores.correo && (
                    <small className="text-danger">
                      {errores.correo}
                    </small>
                  )}

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Contraseña
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  {errores.password && (
                    <small className="text-danger">
                      {errores.password}
                    </small>
                  )}

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Confirmar contraseña
                  </label>

                  <input
                    type="password"
                    name="confirmarPassword"
                    className="form-control"
                    value={formData.confirmarPassword}
                    onChange={handleChange}
                  />

                  {errores.confirmarPassword && (
                    <small className="text-danger">
                      {errores.confirmarPassword}
                    </small>
                  )}

                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Registrarse
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default Register;