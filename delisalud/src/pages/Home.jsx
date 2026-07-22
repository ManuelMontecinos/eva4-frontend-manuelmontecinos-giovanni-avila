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
    telefono: ""
  });

  
  const tiempoEstimado =
    carrito.length <= 2 ? 25 :
    carrito.length <= 4 ? 35 :
    45;

  
  const datosCompletos =
    datos.nombre.trim() !== "" &&
    datos.direccion.trim() !== "" &&
    datos.telefono.trim() !== "";

  
  useEffect(() => {
    if (pedidoConfirmado) {
      const timer = setTimeout(() => {
        setPedidoConfirmado(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [pedidoConfirmado]);

  const confirmarPedido = () => {
    console.log("📦 PEDIDO FINAL:", {
      carrito,
      datos,
      tiempoEstimado
    });

    setPedidoConfirmado(true);

    setCarrito([]);
    setCheckout(false);
    setCarritoAbierto(false);

    setDatos({
      nombre: "",
      direccion: "",
      telefono: ""
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
              borderRadius: "8px",
              zIndex: 9999,
              boxShadow: "0 0 10px rgba(0,0,0,0.2)"
            }}
          >
            ✅ Pedido confirmado correctamente
          </div>
        )}

        
        {carritoAbierto && !checkout && (
          <div
            style={{
              position: "fixed",
              top: "80px",
              right: "20px",
              width: "320px",
              background: "white",
              padding: "15px",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              zIndex: 9999
            }}
          >
            <h4>🛒 Tu pedido</h4>

            {carrito.length === 0 ? (
              <p>Vacío</p>
            ) : (
              carrito.map((item, index) => (
                <div key={index}>
                  🍽️ {item.nombre} - {item.precio}
                </div>
              ))
            )}

            <button
              className="btn btn-success w-100 mt-3"
              onClick={() => setCheckout(true)}
              disabled={carrito.length === 0}
            >
              Terminar pedido
            </button>

            <button
              className="btn btn-danger w-100 mt-2"
              onClick={() => setCarritoAbierto(false)}
            >
              Cerrar
            </button>
          </div>
        )}

        
        {carritoAbierto && checkout && (
          <div
            style={{
              position: "fixed",
              top: "80px",
              right: "20px",
              width: "320px",
              background: "white",
              padding: "15px",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              zIndex: 9999
            }}
          >
            <h4>📦 Datos de entrega</h4>

            <input
              className="form-control my-2"
              placeholder="Nombre"
              value={datos.nombre}
              onChange={(e) =>
                setDatos({ ...datos, nombre: e.target.value })
              }
            />

            <input
              className="form-control my-2"
              placeholder="Dirección"
              value={datos.direccion}
              onChange={(e) =>
                setDatos({ ...datos, direccion: e.target.value })
              }
            />

            <input
              className="form-control my-2"
              placeholder="Teléfono"
              value={datos.telefono}
              onChange={(e) =>
                setDatos({ ...datos, telefono: e.target.value })
              }
            />

           
            {datosCompletos && (
              <p className="mt-2 text-muted">
                ⏱️ Tiempo estimado de entrega: {tiempoEstimado} minutos
              </p>
            )}

            <button
              className="btn btn-primary w-100 mt-2"
              onClick={confirmarPedido}
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