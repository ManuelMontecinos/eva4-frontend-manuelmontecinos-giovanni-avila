import { useState } from "react";
import { actualizarPedido } from "../services/pedidosApi";

function EditarPedido() {
  const [idPedido, setIdPedido] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const [datos, setDatos] = useState({
    nombre: "",
    pedido: "",
    cantidad: "",
    precio: "",
    telefono: "",
    direccion: "",
    departamento: "",
    referencia: "",
  });

  const editarPedido = async (e) => {
    e.preventDefault();

    try {
      await actualizarPedido(idPedido, datos);

      setMensaje("Pedido actualizado correctamente.");
      setError("");

      setIdPedido("");

      setDatos({
        nombre: "",
        pedido: "",
        cantidad: "",
        precio: "",
        telefono: "",
        direccion: "",
        departamento: "",
        referencia: "",
      });
    } catch (error) {
      setError("No se pudo actualizar el pedido.");
      setMensaje("");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">
        Editar Pedido
      </h2>

      <form
        onSubmit={editarPedido}
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

        <input
          className="form-control mb-3"
          placeholder="Nombre completo"
          value={datos.nombre}
          onChange={(e) =>
            setDatos({
              ...datos,
              nombre: e.target.value,
            })
          }
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Pedido"
          value={datos.pedido}
          onChange={(e) =>
            setDatos({
              ...datos,
              pedido: e.target.value,
            })
          }
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Cantidad"
          value={datos.cantidad}
          onChange={(e) =>
            setDatos({
              ...datos,
              cantidad: e.target.value,
            })
          }
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Precio"
          value={datos.precio}
          onChange={(e) =>
            setDatos({
              ...datos,
              precio: e.target.value,
            })
          }
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Teléfono"
          value={datos.telefono}
          onChange={(e) =>
            setDatos({
              ...datos,
              telefono: e.target.value,
            })
          }
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Dirección"
          value={datos.direccion}
          onChange={(e) =>
            setDatos({
              ...datos,
              direccion: e.target.value,
            })
          }
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Departamento (Opcional)"
          value={datos.departamento}
          onChange={(e) =>
            setDatos({
              ...datos,
              departamento: e.target.value,
            })
          }
        />

        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Referencia del domicilio (Opcional)"
          value={datos.referencia}
          onChange={(e) =>
            setDatos({
              ...datos,
              referencia: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="btn btn-warning"
        >
          Actualizar Pedido
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

export default EditarPedido;