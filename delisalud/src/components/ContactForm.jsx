import { useState } from "react";
import "../styles/ContactForm.css";

function ContactForm() {

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
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

    // Nombre obligatorio
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    // Correo válido
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!correoRegex.test(formData.correo)) {
      nuevosErrores.correo = "Ingrese un correo válido.";
    }

    // Mensaje obligatorio
    if (!formData.mensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje es obligatorio.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      alert("Mensaje enviado correctamente.");

      setFormData({
        nombre: "",
        correo: "",
        mensaje: "",
      });

      setErrores({});
    }
  };

  return (
    <section className="container py-5" id="contacto">

      <div className="text-center mb-5">

        <h2 className="fw-bold">
          Contáctanos
        </h2>

        <p className="text-muted">
          ¿Tienes alguna duda o consulta? Envíanos un mensaje y te responderemos lo antes posible.
        </p>

      </div>

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow p-4">

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label className="form-label">
                  Nombre
                </label>

                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Ingrese su nombre"
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
                  placeholder="correo@ejemplo.com"
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
                  Mensaje
                </label>

                <textarea
                  name="mensaje"
                  className="form-control"
                  rows="5"
                  placeholder="Escriba su mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                ></textarea>

                {errores.mensaje && (
                  <small className="text-danger">
                    {errores.mensaje}
                  </small>
                )}

              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
              >
                Enviar mensaje
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ContactForm;