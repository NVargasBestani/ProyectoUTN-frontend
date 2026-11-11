import "./Marcas.css";

function Marcas() {
  const listaMarcas = [
    { id: 1, nombre: "Nike", slogan: "Just Do It" },
    { id: 2, nombre: "Jordan", slogan: "Flight Club" },
    { id: 3, nombre: "Adidas", slogan: "Impossible is Nothing" },
    { id: 4, nombre: "Puma", slogan: "Forever Faster" },
  ];

  return (
    <section className="seccion-marcas">
      <h3 className="titulo-marcas">Marcas Destacadas</h3>
      <div className="grilla-marcas">
        {listaMarcas.map((marca) => (
          <div key={marca.id} className="tarjeta-marca">
            <h4>{marca.nombre}</h4>
            <p>{marca.slogan}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Marcas;
