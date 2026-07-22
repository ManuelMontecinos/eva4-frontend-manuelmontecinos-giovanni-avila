import "../styles/Navbar.css";

function Navbar({ carrito = [], setCarritoAbierto }) {

  const abrirCarrito = () => {
    if (!setCarritoAbierto) {
      console.error("❌ setCarritoAbierto no está llegando al Navbar");
      return;
    }

    console.log("🔥 CLICK CARRITO");
    setCarritoAbierto(true);
  };

  return (
    <nav className="navbar bg-white shadow-sm py-3">
      <div className="container d-flex justify-content-between align-items-center">

        <a className="navbar-brand fw-bold fs-2 m-0" href="/">
          <span className="text-success">Deli</span>Salud
        </a>

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
    </nav>
  );
}

export default Navbar;