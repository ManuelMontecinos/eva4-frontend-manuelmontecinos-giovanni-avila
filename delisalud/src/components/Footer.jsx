function Footer() {
  return (
    <footer className="bg-dark text-white py-5">

      <div className="container">

        <div className="row">

          <div className="col-md-4 mb-4">

            <h4>
              <span className="text-success">Deli</span>Salud
            </h4>

            <p>
              Comida saludable preparada con ingredientes frescos y entregada
              directamente hasta tu hogar.
            </p>

          </div>

          <div className="col-md-4 mb-4">

            <h5>Contacto</h5>

            <p>📧 contacto@delisalud.cl</p>

            <p>📞 +56 9 4594 4443</p>

            <p>📍 Santiago, Chile</p>

          </div>

          <div className="col-md-4 mb-4">

            <h5>Horarios</h5>

            <p>Lunes a Viernes</p>

            <p>09:00 - 20:00 hrs</p>

            <p>Sábado</p>

            <p>10:00 - 15:00 hrs</p>

          </div>

        </div>

        <hr />

        <div className="text-center">

          <p className="mb-0">
            © {new Date().getFullYear()} DeliSalud. Todos los derechos reservados.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;