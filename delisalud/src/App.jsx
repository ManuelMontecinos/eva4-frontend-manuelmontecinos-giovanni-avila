import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerPedidos from "./pages/VerPedidos";
import EditarPedido from "./pages/EditarPedido";
import EliminarPedido from "./pages/EliminarPedido";

function App() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    document.title = "DeliSalud";
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/home"
        element={
          <Home
            carrito={carrito}
            setCarrito={setCarrito}
          />
        }
      />

      <Route
        path="/ver-pedidos"
        element={<VerPedidos />}
      />

      <Route
        path="/editar-pedido"
        element={<EditarPedido />}
      />

      <Route
        path="/eliminar-pedido"
        element={<EliminarPedido />}
      />

      <Route
        path="/register"
        element={<Register />}
      />
    </Routes>
  );
}

export default App;