import { useState } from "react";
import { eliminarPedido } from "../services/pedidosApi";

function EliminarPedido() {
  const [idPedido, setIdPedido] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const eliminar = async (e) => {
    e.preventDefault();

    try {
      await eliminarPedido(idPedido);

      setMensaje("Pedido eliminado correctamente.");
      setError("");
      setIdPedido("");
    } catch (error) {
      setError("No se pudo eliminar el pedido.");
      setMensaje("");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">
        Eliminar Pedido
      </h2>

      <form
        onSubmit={eliminar}
        className="card shadow p-4"
      >
        <input
          className="form-control mb-3"
          placeholder="ID del pedido"
          value={idPedido}
          onChange={(e) =>
            setIdPedido(e.target.value)
          }
          required
        />

        <button
          type="submit"
          className="btn btn-danger"
        >
          Eliminar Pedido
        </button>

        {mensaje && (
          <p className="text-success mt-3 mb-0">
            {mensaje}
          </p>
        )}

        {error && (
          <p className="text-danger mt-3 mb-0">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default EliminarPedido;