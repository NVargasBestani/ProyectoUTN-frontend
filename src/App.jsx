import { useState, useEffect } from "react";
import Navbar from "./componentes/Navbar";
import Login from "./componentes/Login";
import Producto from "./componentes/Producto";
import HeroBanner from "./componentes/HeroBanner";
import "./App.css";

function App() {
  // vamos a crear un espacion en memoria para guardar los productos
  const [productos, setProductos] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const cargarProductos = () => {
    fetch("http://localhost:8000/productos/")
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
      .catch((error) => console.error("Hubo un error:", error));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  //ahora creamos una funcion para salir
  const cerrarSesion = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  //aca creamos la funcion que va a permitir ejecutar la compra
  const comprarProducto = (id_producto) => {
    fetch("http://localhost:8000/comprar/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_usuario: 1,
        id_producto: id_producto,
        cantidad: 1,
      }),
    })
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("Error al procesar la compra");
        return respuesta.json();
      })
      .then((datos) => {
        alert("Compra exitosa!");
        cargarProductos(); //aca refrescamos el catalogo para ver el nuevo stock
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <Navbar token={token} cerrarSesion={cerrarSesion} />

      <HeroBanner />

      <div className="container">
        {!token ? (
          <Login setToken={setToken} />
        ) : (
          <div>
            <h2 className="titulo-seccion">Zapatillas e Indumentaria</h2>
            <div className="grilla-productos">
              {productos.map((producto) => (
                <Producto
                  key={producto.id_producto}
                  producto={producto}
                  comprarProducto={comprarProducto}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
