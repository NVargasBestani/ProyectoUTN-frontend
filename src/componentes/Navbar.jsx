import "./Navbar.css";

function NavBar({ token, cerrarSesion }) {
  return (
    <header className="header-completo">
      {/*esta va a ser la tira negra superior de anuncios */}
      <div className="tira-anuncios">
        <p>¡Hasta 15% OFF y 12 cuotas sin interés!</p>
      </div>
      {/*navbar principal blanca */}
      <nav className="navbar-main">
        <div className="logo-container">
          <svg viewBox="0 0 24 24" width="45" height="45" fill="black">
            <path d="M20.5 4.5l-12 12-4.5-4.5-1.5 1.5 6 6 13.5-13.5z"></path>
          </svg>
        </div>
        <div className="nav-iconos">
          <span className="icono-nav" title="Buscar">
            🔍
          </span>
          <span className="icono-nav" title="Carrito">
            🛍️
          </span>
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
