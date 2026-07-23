const API_URL = "https://apiclases.inacode.cl/pedidos";

const convertirPrecio = (precio) => {
  const numero = Number(String(precio ?? "").replace(/\D/g, ""));
  return Number.isFinite(numero) ? numero : 0;
};

export const construirPayloadPedido = ({
  carrito,
  datos,
  metodoPago,
  pagaCon,
  tiempoEstimado,
  estado = "pendiente",
}) => {
  const items = (carrito || []).map((item) => ({
    producto: item.nombre,
    cantidad: Number(item.cantidad ?? 1),
    precio: convertirPrecio(item.precio),
  }));

  const monto = items.reduce((total, item) => total + item.precio * item.cantidad, 0);

  return {
    cliente: datos?.nombre || "Sin nombre",
    email: datos?.email || "",
    telefono: datos?.telefono || "",
    direccion: datos?.direccion || "",
    monto,
    estado,
    fecha: new Date().toISOString().split("T")[0],
    metodoPago: String(metodoPago || "efectivo").toLowerCase(),
    items,
    pagaCon: pagaCon || "",
    tiempoEstimado,
  };
};

export const obtenerPedidos = async () => {
  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error("No se pudieron obtener los pedidos.");
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    throw error;
  }
};

export const obtenerPedidoPorId = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`);

    if (!respuesta.ok) {
      throw new Error("No se pudo obtener el pedido.");
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error al obtener el pedido:", error);
    throw error;
  }
};

export const crearPedido = async (pedido) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo crear el pedido.");
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    throw error;
  }
};

export const actualizarPedido = async (id, pedidoActualizado) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedidoActualizado),
    });
    const data = await respuesta.json().catch(() => null);

    if (!respuesta.ok) {
      console.error("API actualizarPedido falló:", data || respuesta.status);
      return data || { error: `HTTP ${respuesta.status}` };
    }

    return data;
  } catch (error) {
    console.error("Error al actualizar el pedido:", error);
    return { error: String(error) };
  }
};

export const eliminarPedido = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await respuesta.json().catch(() => null);

    if (!respuesta.ok) {
      console.error("API eliminarPedido falló:", data || respuesta.status);
      return data || { error: `HTTP ${respuesta.status}` };
    }

    return data;
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    return { error: String(error) };
  }
};