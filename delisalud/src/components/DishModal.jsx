function DishModal({ plato, cerrarModal }) {
  if (!plato) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {plato.nombre}
            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={cerrarModal}
            ></button>
          </div>

          <div className="modal-body">
            {/* Imagen del plato */}
            <img
              src={plato.imagen}
              alt={plato.nombre}
              className="img-fluid rounded mb-3 w-100"
              style={{
                height: "250px",
                objectFit: "cover",
              }}
            />

            <h4 className="text-success mb-3">
              {plato.precio}
            </h4>

            <p>
              {plato.descripcion}
            </p>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={cerrarModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishModal;