const API_URL = "https://apiclases.inacode.cl/pedidos";

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

    if (!respuesta.ok) {
      throw new Error("No se pudo actualizar el pedido.");
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error al actualizar el pedido:", error);
    throw error;
  }
};

export const eliminarPedido = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo eliminar el pedido.");
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    throw error;
  }
};