function MenuAccordion({ carrito, setCarrito }) {

  const menuSemana = [
    {
      nombre: "🥗 Quinoa con pollo a la plancha",
      precio: "$6.990",
      descripcion:
        "Rica en proteínas y fibra, ideal para una alimentación equilibrada."
    },
    {
      nombre: "🐟 Salmón al horno con papas cocidas",
      precio: "$8.990",
      descripcion:
        "Preparado con ingredientes frescos y alto contenido de Omega-3."
    },
    {
      nombre: "🥣 Lentejas con verduras",
      precio: "$5.490",
      descripcion:
        "Excelente fuente de proteínas vegetales, hierro y fibra."
    },
    {
      nombre: "🌮 Fajitas de pollo",
      precio: "$6.990",
      descripcion:
        "Pollo salteado con verduras frescas en tortillas suaves."
    }
  ];

  const agregarAlCarrito = (plato) => {

    const existe = carrito.find(
      (item) => item.nombre === plato.nombre
    );

    if (existe) {

      const nuevoCarrito = carrito.map((item) =>
        item.nombre === plato.nombre
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );

      setCarrito(nuevoCarrito);

    } else {

      setCarrito([
        ...carrito,
        {
          ...plato,
          cantidad: 1
        }
      ]);

    }

  };

  return (
    <section className="container py-5">

      <h2 className="text-center mb-4">
        Menú disponible esta semana
      </h2>

      <div className="accordion" id="menuSemana">

        <div className="accordion-item">

          <h2 className="accordion-header">

            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#semana"
            >
              Ver platos disponibles
            </button>

          </h2>

          <div
            id="semana"
            className="accordion-collapse collapse show"
            data-bs-parent="#menuSemana"
          >

            <div className="accordion-body">

              <div className="row">

                {menuSemana.map((plato) => (

                  <div
                    className="col-md-6 mb-4"
                    key={plato.nombre}
                  >

                    <h5>{plato.nombre}</h5>

                    <p>{plato.descripcion}</p>

                    <h6 className="text-success fw-bold">
                      {plato.precio}
                    </h6>

                    <button
                      className="btn btn-success"
                      onClick={() => agregarAlCarrito(plato)}
                    >
                      Pedir
                    </button>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default MenuAccordion;