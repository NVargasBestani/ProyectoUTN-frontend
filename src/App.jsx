import { useState, useEffect } from "react";
import NavBar from "./componentes/NavBar";
import Login from "./componentes/Login";
import Producto from "./componentes/Producto";
import HeroBanner from "./componentes/HeroBanner";
import Carrito from "./componentes/Carrito";
import "./App.css";

function App() {
  // vamos a crear un espacion en memoria para guardar los productos
  const [productos, setProductos] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [carrito, setCarrito] = useState([]);
  const [carritoVisible, setCarritoVisible] = useState(false);

  const cargarProductos = () => {
    fetch("http://localhost:8000/productos/")
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
      .catch((error) => console.error("Hubo un error:", error));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const finalizarCompra = async () => {
    if (carrito.length === 0) return;

    try {
      for (const item of carrito) {
        const respuesta = await fetch("http://localhost:8000/comprar/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_usuario: 1, // <-- AGREGAMOS ESTE CAMPO REQUERIDO POR FASTAPI
            id_producto: item.id_producto,
            cantidad: item.cantidad,
          }),
        });

        if (!respuesta.ok) {
          const errorData = await respuesta.json();
          const mensajeError =
            typeof errorData.detail === "object"
              ? JSON.stringify(errorData.detail)
              : errorData.detail || `Error al comprar ${item.nombre}`;

          throw new Error(mensajeError);
        }
      }

      alert("¡Compra realizada con éxito! El stock ha sido actualizado.");
      vaciarCarrito();
      setCarritoVisible(false);
      cargarProductos();
    } catch (error) {
      alert(`Error en la compra: ${error.message}`);
    }
  };

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find(
        (item) => item.id_producto === producto.id_producto,
      );
      if (existe) {
        return prev.map((item) =>
          item.id_producto === producto.id_producto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id_producto) => {
    setCarrito((prev) =>
      prev.filter((item) => item.id_producto !== id_producto),
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  const totalItemsCarrito = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0,
  );

  return (
    <div>
      <NavBar
        token={token}
        cerrarSesion={() => {
          setToken(null);
          localStorage.removeItem("token");
        }}
        abrirCarrito={() => setCarritoVisible(true)}
        totalItems={totalItemsCarrito}
      />

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
                  comprarProducto={() => agregarAlCarrito(producto)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Carrito
        items={carrito}
        visible={carritoVisible}
        cerrarCarrito={() => setCarritoVisible(false)}
        vaciarCarrito={vaciarCarrito}
        eliminarItem={eliminarDelCarrito}
        finalizarCompra={finalizarCompra}
      />
    </div>
  );
}

export default App;
