import { useState } from "react";

function Testimonials() {

  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);

  const enviarComentario = () => {
    if (comentario.trim() === "") return;

    setComentarios([...comentarios, comentario]);
    setComentario("");
  };

  return (
    <section className="container py-5">

      <h2 className="text-center mb-5">
        Comentarios de clientes
      </h2>

      {/* 💬 INPUT */}
      <div className="text-center mb-4">

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Escribe tu comentario..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        <button
          className="btn btn-success"
          onClick={enviarComentario}
        >
          Enviar comentario
        </button>

      </div>

      {/* 🧠 LISTA DINÁMICA */}
      <div className="row">

        {comentarios.length === 0 ? (
          <p className="text-center text-muted">
            Aún no hay comentarios. Sé el primero en opinar 🍽️
          </p>
        ) : (
          comentarios.map((c, index) => (
            <div key={index} className="col-md-6 mb-3">
              <div className="p-3 bg-light rounded shadow-sm">
                💬 {c}
              </div>
            </div>
          ))
        )}

      </div>

    </section>
  );
}

export default Testimonials;