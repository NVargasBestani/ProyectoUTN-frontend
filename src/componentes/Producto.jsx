import "./Producto.css";

function Producto({ producto, comprarProducto }) {
  // Foto por defecto si la URL viene vacía desde la BD
  const imagenPorDefecto =
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600";

  return (
    <div className="tarjeta-producto">
      <div className="contenedor-imagen">
        <img
          src={producto.url_imagen || imagenPorDefecto}
          alt={producto.nombre}
          className="imagen-producto"
        />
      </div>

      <div className="info-producto">
        <h3 className="titulo">{producto.nombre}</h3>
        <p className="precio">${producto.precio}</p>
        <p className="stock">Stock disponible: {producto.stock}</p>
      </div>

      <button
        className="btn-primario"
        onClick={() => comprarProducto(producto.id_producto)}
        disabled={producto.stock <= 0}
      >
        {producto.stock > 0 ? "Comprar 1 unidad" : "Sin stock"}
      </button>
    </div>
  );
}

export default Producto;
