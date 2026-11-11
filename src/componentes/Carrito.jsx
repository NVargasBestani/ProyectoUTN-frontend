import "./Carrito.css";
function Carrito({
  items,
  visible,
  cerrarCarrito,
  vaciarCarrito,
  eliminarItem,
  finalizarCompra,
}) {
  if (!visible) return null;

  const total = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );

  return (
    <div className="modal-overlay" onClick={cerrarCarrito}>
      <div className="modal-carrito" onClick={(e) => e.stopPropagation()}>
        <div className="header-carrito">
          <h2>Tu Carrito</h2>
          <button className="btn-cerrar" onClick={cerrarCarrito}>
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="carrito-vacio">El carrito está vacío.</p>
        ) : (
          <div className="lista-items">
            {items.map((item) => (
              <div key={item.id_producto} className="item-carrito">
                <div>
                  <h4>{item.nombre}</h4>
                  <p>
                    ${item.precio} x {item.cantidad}
                  </p>
                </div>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarItem(item.id_producto)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="footer-carrito">
          <div className="total-contenedor">
            <span>Total:</span>
            <strong>${total}</strong>
          </div>
          {items.length > 0 && (
            <div className="acciones-carrito">
              <button className="btn-vaciar" onClick={vaciarCarrito}>
                Vaciar
              </button>
              <button className="btn-finalizar" onClick={finalizarCompra}>
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Carrito;
