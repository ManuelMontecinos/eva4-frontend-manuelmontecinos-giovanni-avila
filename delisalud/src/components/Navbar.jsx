import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ carrito = [], setCarritoAbierto }) {
  const abrirCarrito = () => {
    if (!setCarritoAbierto) {
      console.error("❌ setCarritoAbierto no está llegando al Navbar");
      return;
    }

    setCarritoAbierto(true);
  };

  return (
    <nav className="navbar bg-white shadow-sm py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold fs-2 m-0" to="/home">
          <span className="text-success">Deli</span>Salud
        </Link>

        <div className="d-flex align-items-center gap-2">
          <Link className="btn btn-outline-success btn-sm" to="/ver-pedidos">
            Mis pedidos
          </Link>

          <button
            type="button"
            className="btn border-0 bg-transparent fs-4 position-relative"
            onClick={abrirCarrito}
          >
            🛒
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
              {carrito.length}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;