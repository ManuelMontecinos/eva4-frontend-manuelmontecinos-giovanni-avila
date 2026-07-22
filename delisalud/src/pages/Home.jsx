import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import HeroLanding from "../components/HeroLanding";
import MenuCards from "../components/MenuCards";
import MenuAccordion from "../components/MenuAccordion";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";


function Home() {

  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  const [datos, setDatos] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    departamento: "",
    referencia: "",
  });

  const [metodoPago, setMetodoPago] = useState("");
  const [pagaCon, setPagaCon] = useState("");

  const totalProductos = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const tiempoEstimado =
    totalProductos <= 2
      ? 25
      : totalProductos <= 4
      ? 35
      : 45;

  const datosCompletos =
    datos.nombre.trim() !== "" &&
    datos.telefono.trim() !== "" &&
    datos.direccion.trim() !== "";

  useEffect(() => {

    if (pedidoConfirmado) {

      const timer = setTimeout(() => {
        setPedidoConfirmado(false);
      }, 3000);

      return () => clearTimeout(timer);

    }

  }, [pedidoConfirmado]);

  const aumentarCantidad = (nombre) => {

    setCarrito(
      carrito.map((item) =>
        item.nombre === nombre
          ? {
              ...item,
              cantidad: item.cantidad + 1,
            }
          : item
      )
    );

  };

  const disminuirCantidad = (nombre) => {

    const nuevoCarrito = carrito
      .map((item) =>
        item.nombre === nombre
          ? {
              ...item,
              cantidad: item.cantidad - 1,
            }
          : item
      )
      .filter((item) => item.cantidad > 0);

    setCarrito(nuevoCarrito);

  };

  const eliminarProducto = (nombre) => {

    setCarrito(
      carrito.filter(
        (item) => item.nombre !== nombre
      )
    );

  };

  const confirmarPedido = async () => {

    const pedido = {
      carrito,
      datos,
      metodoPago,
      pagaCon:
        metodoPago === "Efectivo"
          ? pagaCon
          : "",
      tiempoEstimado,
    };

    console.log(pedido);

    setPedidoConfirmado(true);

    setCarrito([]);
    setCheckout(false);
    setCarritoAbierto(false);

    setMetodoPago("");
    setPagaCon("");

    setDatos({
      nombre: "",
      direccion: "",
      telefono: "",
      departamento: "",
      referencia: "",
    });

  };

  return (
    <>
      <Navbar
        carrito={carrito}
        setCarritoAbierto={setCarritoAbierto}
      />

      <main>

        <HeroLanding />

        <MenuCards />

        <MenuAccordion
          carrito={carrito}
          setCarrito={setCarrito}
        />

        <Testimonials />

        <Footer
          carrito={carrito}
          setCarritoAbierto={setCarritoAbierto}
        />

        {pedidoConfirmado && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              background: "#198754",
              color: "white",
              padding: "12px 16px",
              borderRadius: "10px",
              zIndex: 9999,
              boxShadow: "0 5px 15px rgba(0,0,0,.2)",
            }}
          >
            ✅ Pedido confirmado correctamente
          </div>
        )}
        
                {carritoAbierto && !checkout && (
          <div
            style={{
              position: "fixed",
              top: "75px",
              right: "15px",
              width: "300px",
              maxHeight: "75vh",
              overflowY: "auto",
              background: "#fff",
              padding: "12px",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,.2)",
              zIndex: 9999,
            }}
          >
            <h5 className="fw-bold text-center mb-3">
              🛒 Tu pedido
            </h5>

            {carrito.length === 0 ? (
              <p className="text-center text-muted">
                Tu carrito está vacío
              </p>
            ) : (
              carrito.map((item) => (
                <div
                  key={item.nombre}
                  className="border rounded p-2 mb-2"
                >
                  <h6 className="mb-1 fs-6">
                    {item.nombre}
                  </h6>

                  <small className="text-success fw-bold d-block mb-2">
                    {item.precio}
                  </small>

                  <div className="d-flex justify-content-center align-items-center gap-2 mb-2">

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => disminuirCantidad(item.nombre)}
                    >
                      −
                    </button>

                    <span className="fw-bold">
                      x{item.cantidad}
                    </span>

                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => aumentarCantidad(item.nombre)}
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => eliminarProducto(item.nombre)}
                  >
                    Eliminar
                  </button>

                </div>
              ))
            )}

            <div className="border-top pt-2">

              <p className="mb-2 text-center">
                <strong>Total de productos:</strong> {totalProductos}
              </p>

              <button
                className="btn btn-success w-100"
                onClick={() => setCheckout(true)}
                disabled={carrito.length === 0}
              >
                Terminar pedido
              </button>

              <button
                className="btn btn-secondary w-100 mt-2"
                onClick={() => setCarritoAbierto(false)}
              >
                Cerrar
              </button>

            </div>

          </div>
        )}

        {carritoAbierto && checkout && (
          <div
            style={{
              position: "fixed",
              top: "75px",
              right: "15px",
              width: "320px",
              maxHeight: "75vh",
              overflowY: "auto",
              background: "#fff",
              padding: "15px",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,.2)",
              zIndex: 9999,
            }}
          >
            <h5 className="text-center mb-3">
              📦 Datos de entrega
            </h5>

            <input
              className="form-control form-control-sm mb-2"
              placeholder="Nombre completo"
              value={datos.nombre}
              onChange={(e) =>
                setDatos({
                  ...datos,
                  nombre: e.target.value,
                })
              }
            />

            <input
              className="form-control form-control-sm mb-2"
              placeholder="Teléfono"
              value={datos.telefono}
              onChange={(e) =>
                setDatos({
                  ...datos,
                  telefono: e.target.value,
                })
              }
            />

            <input
              className="form-control form-control-sm mb-2"
              placeholder="Dirección"
              value={datos.direccion}
              onChange={(e) =>
                setDatos({
                  ...datos,
                  direccion: e.target.value,
                })
              }
            />

            <input
              className="form-control form-control-sm mb-2"
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
              className="form-control form-control-sm"
              rows="2"
              placeholder="Referencia del domicilio (Opcional)"
              value={datos.referencia}
              onChange={(e) =>
                setDatos({
                  ...datos,
                  referencia: e.target.value,
                })
              }
            />

            <hr />
                        <h6 className="mb-2">
              💳 Forma de pago
            </h6>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="tarjeta"
                name="metodoPago"
                value="Tarjeta"
                checked={metodoPago === "Tarjeta"}
                onChange={(e) =>
                  setMetodoPago(e.target.value)
                }
              />

              <label
                className="form-check-label"
                htmlFor="tarjeta"
              >
                Tarjeta
              </label>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                id="efectivo"
                name="metodoPago"
                value="Efectivo"
                checked={metodoPago === "Efectivo"}
                onChange={(e) =>
                  setMetodoPago(e.target.value)
                }
              />

              <label
                className="form-check-label"
                htmlFor="efectivo"
              >
                Efectivo
              </label>
            </div>

            <hr />

            <p className="small mb-1">
              <strong>Productos:</strong> {totalProductos}
            </p>

            <p className="small mb-1">
              <strong>Tiempo estimado de preparación:</strong>{" "}
              {tiempoEstimado} minutos
            </p>

            <p className="small mb-3">
              <strong>Método de pago:</strong>{" "}
              {metodoPago || "No seleccionado"}
            </p>

            <button
              className="btn btn-success w-100"
              onClick={confirmarPedido}
              disabled={
                !datosCompletos ||
                metodoPago === ""
              }
            >
              Confirmar pedido
            </button>

            <button
              className="btn btn-secondary w-100 mt-2"
              onClick={() => setCheckout(false)}
            >
              Volver
            </button>

          </div>
        )}

      </main>
    </>
  );
}

export default Home;
