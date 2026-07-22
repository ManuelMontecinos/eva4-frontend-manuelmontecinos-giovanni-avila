import Hero from "../components/Hero";

function Login() {
  return (
    <>
      <div className="text-center py-4">
        <h1 className="fw-bold fs-1">
          <span className="text-success">Deli</span>Salud
        </h1>

        <p className="text-muted">
          Comida saludable, rápida y a tu puerta
        </p>

        
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
          alt="comida saludable"
          className="img-fluid rounded shadow my-4"
          style={{
            maxHeight: "320px",
            objectFit: "cover"
          }}
        />
      </div>

      <Hero />
    </>
  );
}

export default Login;