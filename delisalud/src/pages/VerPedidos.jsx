import { useEffect, useState } from "react";
import { actualizarPedido, eliminarPedido, obtenerPedidos } from "../services/pedidosApi";

function VerPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [editandoId, setEditandoId] = useState("");
  const [formData, setFormData] = useState({
    cliente: "",
    email: "",
    telefono: "",
    direccion: "",
    metodoPago: "efectivo",
  });
  const [guardando, setGuardando] = useState(false);
  const [opError, setOpError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const obtenerTexto = (valor) => {
    if (valor === null || valor === undefined || valor === "") return "-";
    if (typeof valor === "object") {
      if (valor.nombre) return valor.nombre;
      if (valor.email) return valor.email;
      if (valor.telefono) return valor.telefono;
      if (valor.direccion) return valor.direccion;
      return JSON.stringify(valor);
    }
    return valor;
  };

  const cargarPedidos = async () => {
    try {
      const respuesta = await obtenerPedidos();
      setPedidos(respuesta.datos || []);
      setError("");
    } catch (error) {
      setError("No se pudieron cargar los pedidos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  const iniciarEdicion = (pedido) => {
    const pedidoId = pedido.insertedId || pedido._id || pedido.idPedido || pedido.id || "";
    setEditandoId(pedidoId);
    setFormData({
      cliente:
        typeof pedido.cliente === "object"
          ? pedido.cliente.nombre || pedido.nombre || ""
          : pedido.cliente || pedido.nombre || "",
      email:
        typeof pedido.cliente === "object"
          ? pedido.cliente.email || pedido.email || ""
          : pedido.email || "",
      telefono:
        typeof pedido.cliente === "object"
          ? pedido.cliente.telefono || pedido.telefono || ""
          : pedido.telefono || "",
      direccion:
        typeof pedido.cliente === "object"
          ? pedido.cliente.direccion || pedido.direccion || ""
          : pedido.direccion || "",
      metodoPago: pedido.metodoPago || "efectivo",
    });
    setMensaje("");
  };

  const guardarEdicion = async (e, pedido) => {
    e.preventDefault();
    const pedidoId = pedido.insertedId || pedido._id || pedido.idPedido || pedido.id || "";

    if (!pedidoId) {
      return;
    }

    setGuardando(true);

    try {
      const pedidoActualizado = {
        ...pedido,
        cliente: formData.cliente,
        email: formData.email,
        telefono: formData.telefono,
        direccion: formData.direccion,
        metodoPago: formData.metodoPago,
        monto: Number(pedido.monto || 0),
        items: pedido.items || [],
      };

      const respuesta = await actualizarPedido(pedidoId, pedidoActualizado);

      if (respuesta && respuesta.error) {
        const text = typeof respuesta.error === "string" ? respuesta.error : JSON.stringify(respuesta);
        setOpError(text || "No se pudo actualizar el pedido.");
        setMensaje("");
      } else {
        const pedidoGuardado = respuesta?.datos || pedidoActualizado;

        setPedidos((prev) =>
          prev.map((item) => {
            const idActual = item.insertedId || item._id || item.idPedido || item.id || "";
            return idActual === pedidoId ? { ...item, ...pedidoGuardado } : item;
          })
        );
        setEditandoId("");
        setMensaje("Pedido actualizado correctamente.");
        setOpError("");
      }
    } catch (error) {
      setOpError("No se pudo actualizar el pedido.");
      setMensaje("");
    } finally {
      setGuardando(false);
    }
  };

  const cancelarPedido = async (pedido) => {
    const pedidoId = pedido.insertedId || pedido._id || pedido.idPedido || pedido.id || "";

    if (!pedidoId) {
      return;
    }

    try {
      const respuesta = await eliminarPedido(pedidoId);

      if (respuesta && respuesta.error) {
        const text = typeof respuesta.error === "string" ? respuesta.error : JSON.stringify(respuesta);
        setOpError(text || "No se pudo cancelar el pedido.");
        setMensaje("");
        return;
      }

      setPedidos((prev) => prev.filter((item) => {
        const idActual = item.insertedId || item._id || item.idPedido || item.id || "";
        return idActual !== pedidoId;
      }));

      setMensaje("Pedido cancelado correctamente.");
      setOpError("");
    } catch (error) {
      setOpError("No se pudo cancelar el pedido.");
      setMensaje("");
    }
  };

  if (cargando) {
    return <h3 className="text-center mt-5">Cargando pedidos...</h3>;
  }

  if (error) {
    return <h3 className="text-center text-danger mt-5">{error}</h3>;
  }

  const busquedaNormalizada = busqueda.trim().toLowerCase();
  const pedidosFiltrados = busquedaNormalizada
    ? pedidos.filter((pedido) => {
        const id = String(pedido._id || pedido.idPedido || pedido.id || "").toLowerCase();
        const cliente = obtenerTexto(pedido.cliente).toLowerCase();
        const email = obtenerTexto(pedido.email).toLowerCase();
        const telefono = obtenerTexto(pedido.telefono).toLowerCase();
        const direccion = obtenerTexto(pedido.direccion).toLowerCase();
        const itemsText = (pedido.items || [])
          .map((item) => `${item.producto} ${item.cantidad}`)
          .join(" ")
          .toLowerCase();

        return (
          id.includes(busquedaNormalizada) ||
          cliente.includes(busquedaNormalizada) ||
          email.includes(busquedaNormalizada) ||
          telefono.includes(busquedaNormalizada) ||
          direccion.includes(busquedaNormalizada) ||
          itemsText.includes(busquedaNormalizada)
        );
      })
    : pedidos;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Pedidos realizados</h2>

      {mensaje && (
        <div className="alert alert-success" role="alert">
          {mensaje}
        </div>
      )}

      {opError && (
        <div className="alert alert-danger" role="alert">
          {opError}
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar pedido por ID, cliente, email, teléfono, dirección o producto"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {!cargando && pedidos.length > 0 && (
        <div className="text-center text-muted mb-3">
          Puedes editar o cancelar cualquier pedido desde aquí.
        </div>
      )}

      {pedidosFiltrados.length === 0 ? (
        <p className="text-center text-muted">
          {pedidos.length === 0
            ? "No existen pedidos registrados."
            : "No se encontraron pedidos que coincidan con la búsqueda."}
        </p>
      ) : (
        <div className="row">
          {pedidosFiltrados.map((pedido) => {
            const pedidoId = pedido._id || pedido.idPedido || pedido.id || "";

            return (
              <div key={pedidoId} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow h-100">
                  <div className="card-body">
                    <h5 className="card-title">Pedido #{pedidoId}</h5>
                    <p className="small mb-1">
                      <strong>Cliente:</strong> {obtenerTexto(pedido.cliente) || obtenerTexto(pedido.nombre)}
                    </p>
                    <p>
                      <strong>Email:</strong> {obtenerTexto(pedido.email) || "-"}
                    </p>
                    <p>
                      <strong>Teléfono:</strong> {obtenerTexto(pedido.telefono) || "-"}
                    </p>
                    <p>
                      <strong>Dirección:</strong> {obtenerTexto(pedido.direccion) || "-"}
                    </p>
                    <p>
                      <strong>Monto:</strong> ${pedido.monto || 0}
                    </p>

                    {pedido.items?.length > 0 && (
                      <div className="mb-3">
                        <strong>Productos:</strong>
                        <ul className="mb-0 mt-2">
                          {pedido.items.map((item, index) => (
                            <li key={`${pedidoId}-${index}`}>
                              {item.producto} x{item.cantidad}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {editandoId === pedidoId ? (
                      <form onSubmit={(e) => guardarEdicion(e, pedido)}>
                        <input
                          className="form-control form-control-sm mb-2"
                          placeholder="Cliente"
                          value={formData.cliente}
                          onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                        />
                        <input
                          className="form-control form-control-sm mb-2"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <input
                          className="form-control form-control-sm mb-2"
                          placeholder="Teléfono"
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        />
                        <input
                          className="form-control form-control-sm mb-2"
                          placeholder="Dirección"
                          value={formData.direccion}
                          onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                        />
                        <button type="submit" className="btn btn-success btn-sm w-100" disabled={guardando}>
                          {guardando ? "Guardando..." : "Guardar cambios"}
                        </button>
                      </form>
                    ) : (
                      <div className="d-grid gap-2">
                        <button className="btn btn-outline-warning btn-sm" onClick={() => iniciarEdicion(pedido)}>
                          Editar
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => cancelarPedido(pedido)}
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default VerPedidos;