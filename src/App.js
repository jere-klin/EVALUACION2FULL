import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Cart from './pages/Cart';
import Login from './pages/Login';
import CrearCuenta from './pages/CrearCuenta';
import './styles/styles.css';

function App() {
  const [carrito, setCarrito] = useState({ items: [], total: 0 });
  const [usuarioId, setUsuarioId] = useState(localStorage.getItem('usuarioId'));

  // Cargar carrito desde el servidor
  const cargarCarrito = async () => {
    if (!usuarioId) return;
    try {
      const response = await fetch(`http://localhost:8080/api/carrito/usuario/${usuarioId}`);
      if (response.ok) {
        const data = await response.json();
        setCarrito({ items: data.items, total: data.total });
      }
    } catch (error) {
      console.error("Error cargando carrito:", error);
    }
  };

  // Escuchar cambios en el login
  useEffect(() => {
    const handleStorageChange = () => setUsuarioId(localStorage.getItem('usuarioId'));
    window.addEventListener('storage', handleStorageChange);
    cargarCarrito();
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [usuarioId]);

  const agregarAlCarrito = async (producto) => {
    if (!usuarioId) return alert("Por favor, inicia sesión para comprar");
    try {
      await fetch(`http://localhost:8080/api/carrito/${usuarioId}/agregar/${producto.id}?cantidad=1`, { method: 'POST' });
      cargarCarrito();
    } catch (error) {
      console.error("Error al agregar:", error);
    }
  };

  const eliminarDelCarrito = async (itemId) => {
    try {
      await fetch(`http://localhost:8080/api/carrito/item/${itemId}`, { method: 'DELETE' });
      cargarCarrito();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const vaciarCarritoLocal = () => setCarrito({ items: [], total: 0 });

  return (
    <div className="app-wrapper">
      <Navbar totalItems={carrito.items.length} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<CrearCuenta />} />
          <Route 
            path="/cart" 
            element={
              <Cart 
                items={carrito.items} 
                totalBackend={carrito.total} 
                usuarioId={usuarioId}
                vaciarCarrito={vaciarCarritoLocal}
                eliminarDelCarrito={eliminarDelCarrito}
              />
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;