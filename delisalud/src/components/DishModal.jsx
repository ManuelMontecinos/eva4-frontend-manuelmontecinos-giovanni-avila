function DishModal({ plato, cerrarModal }) {

  if (!plato) return null;

  return (

    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)"
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

            <div
              className="bg-light d-flex justify-content-center align-items-center mb-3"
              style={{ height: "250px" }}
            >
              Imagen aquí
            </div>

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