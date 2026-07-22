import { useEffect, useState } from "react";
import { obtenerPedidos } from "../services/pedidosApi";

function VerPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const respuesta = await obtenerPedidos();

        setPedidos(respuesta.datos || []);
      } catch (error) {
        setError("No se pudieron cargar los pedidos.");
      } finally {
        setCargando(false);
      }
    };

    cargarPedidos();
  }, []);

  if (cargando) {
    return (
      <h3 className="text-center mt-5">
        Cargando pedidos...
      </h3>
    );
  }

  if (error) {
    return (
      <h3 className="text-center text-danger mt-5">
        {error}
      </h3>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">
        Pedidos Realizados
      </h2>

      {pedidos.length === 0 ? (
        <p className="text-center text-muted">
          No existen pedidos registrados.
        </p>
      ) : (
        <div className="row">
          {pedidos.map((pedido) => (
            <div
              key={pedido.idPedido}
              className="col-md-6 col-lg-4 mb-4"
            >
              <div className="card shadow h-100">
                <div className="card-body">

                  <h5 className="card-title">
                    Pedido #{pedido.idPedido}
                  </h5>

                  <p>
                    <strong>Nombre:</strong>{" "}
                    {pedido.nombre}
                  </p>

                  <p>
                    <strong>Pedido:</strong>{" "}
                    {pedido.pedido}
                  </p>

                  <p>
                    <strong>Cantidad:</strong>{" "}
                    {pedido.cantidad}
                  </p>

                  <p>
                    <strong>Precio:</strong>{" "}
                    {pedido.precio}
                  </p>

                  <p>
                    <strong>Teléfono:</strong>{" "}
                    {pedido.telefono}
                  </p>

                  <p>
                    <strong>Dirección:</strong>{" "}
                    {pedido.direccion}
                  </p>

                  <p>
                    <strong>Departamento:</strong>{" "}
                    {pedido.departamento}
                  </p>

                  <p>
                    <strong>Referencia:</strong>{" "}
                    {pedido.referencia}
                  </p>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VerPedidos;