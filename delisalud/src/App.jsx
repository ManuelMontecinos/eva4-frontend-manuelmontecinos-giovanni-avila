import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
          <Home carrito={carrito} setCarrito={setCarrito} />
        }
      />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;