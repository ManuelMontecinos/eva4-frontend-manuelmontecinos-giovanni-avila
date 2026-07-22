import { useState } from "react";
import DishModal from "./DishModal";

function MenuCards() {

  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);

  const platos = [
    {
      nombre: "Guiso de zapallo italiano",
      precio: "$5.990",
      descripcion:
        "Delicioso guiso preparado con zapallo italiano, verduras frescas y un toque de especias naturales.",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL8OZKVWR5sZQT1SKrv6srJtIPjOf9jK22t70QC9-YWQ&s"
    },
    {
      nombre: "Quinoa con pollo a la plancha",
      precio: "$6.990",
      descripcion:
        "Quinoa cocida acompañada de pechuga de pollo a la plancha, rica en proteínas y fibra.",
      imagen: "https://st1.uvnimg.com/f0/ad/4cdb40a34a038a410c5429173c5f/polloquinoa.jpg"
    },
    {
      nombre: "Chimichanga saludable",
      precio: "$6.490",
      descripcion:
        "Preparada con atún, palta, tomate y choclo fresco en una tortilla integral.",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS57MUIUUe3G1l9W3Prrye1PH1Wus3CfxKZML2eBMYDFQ&s=10"
    },
    {
      nombre: "Lentejas",
      precio: "$5.490",
      descripcion:
        "Lentejas cocinadas con verduras seleccionadas y condimentos naturales.",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZA8KnwCpsMu5Win9McXN0tDla8iW6fk7eTP_JTHwMuQ&s=10"
    },
    {
      nombre: "Salmón al horno con papas",
      precio: "$8.990",
      descripcion:
        "Filete de salmón horneado acompañado de papas cocidas.",
      imagen: "https://images.unsplash.com/photo-1467003909585-2f8a72700288"
    },
    {
      nombre: "Tortilla de porotos verdes",
      precio: "$5.990",
      descripcion:
        "Tortilla preparada con huevos y porotos verdes frescos.",
      imagen: "https://www.midiariodecocina.com/wp-content/uploads/2017/01/Tortilla-de-porotos-verdes01.jpg"
    },
    {
      nombre: "Tortilla de acelga",
      precio: "$5.790",
      descripcion:
        "Deliciosa tortilla elaborada con acelga fresca y huevos.",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaMuI2ZAmL2pznpQumiItNAZtc71RNCiM1mkbfZiDPaYdtKcdVPhUraQY&s=10"
    },
    {
      nombre: "Fajitas de pollo",
      precio: "$6.990",
      descripcion:
        "Tiras de pollo salteadas con verduras frescas en tortillas suaves.",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjlFWflZDYRP1O5ywMUChLl0HGjFne6EcXBy9TQxehBxLO78DeX06kd-P1&s=10"
    }
  ];

  return (
    <section id="menus" className="container py-5">

      <h2 className="text-center mb-5">
        Nuestros Menús
      </h2>

      <div className="row">

        {platos.map((plato) => (

          <div
            className="col-md-6 col-lg-4 mb-4"
            key={plato.nombre}
          >

            <div className="card h-100 shadow">

              {/* 🖼️ IMAGEN FIJA DEL PLATO */}
              <img
                src={plato.imagen}
                className="card-img-top"
                alt={plato.nombre}
                style={{ height: "220px", objectFit: "cover" }}
              />

              <div className="card-body text-center">

                <h5 className="card-title">
                  {plato.nombre}
                </h5>

                <h4 className="text-success my-3">
                  {plato.precio}
                </h4>

                <button
                  className="btn btn-success"
                  onClick={() => setPlatoSeleccionado(plato)}
                >
                  Ver detalles
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      <DishModal
        plato={platoSeleccionado}
        cerrarModal={() => setPlatoSeleccionado(null)}
      />

    </section>
  );
}

export default MenuCards;