import "./NavBar.css";

function NavBar({ token, cerrarSesion, abrirCarrito, totalItems }) {
  return (
    <header className="header-completo">
      {/*esta va a ser la tira negra superior de anuncios */}
      <div className="tira-anuncios">
        <p>¡Hasta 15% OFF y 12 cuotas sin interés!</p>
      </div>
      {/*navbar principal blanca */}
      <nav className="navbar-main">
        <div className="logo-container"></div>
        <div className="nav-iconos">
          <span className="icono-nav" title="Buscar">
            🔍
          </span>
          <div
            className="contenedor-carrito-icono"
            onClick={abrirCarrito}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <span className="icono-nav" title="Carrito">
              🛍️
            </span>
            {totalItems > 0 && (
              <span className=" badge-carrito">{totalItems}</span>
            )}
          </div>
          {token ? (
            <button
              className="btn-salir-icono"
              onClick={cerrarSesion}
              title="Cerrar Sesion"
            >
              🚪 Salir
            </button>
          ) : (
            <span className="icono-nav" title="Usuario">
              👤
            </span>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
