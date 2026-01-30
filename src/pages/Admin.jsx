import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  const [inventario, setInventario] = useState([]);

  
  const cargarProductos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/productos');
      const data = await response.json();
      setInventario(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    const rol = localStorage.getItem('rolUsuario');
    if (rol !== 'admin') {
      alert("Acceso denegado. Solo administradores.");
      navigate('/');
    } else {
      cargarProductos();
    }
  }, [navigate]);

  
  const guardarCambios = async (id) => {
    try {
      
      const nuevoNombre = document.getElementById(`nom-${id}`).value;
      const nuevoPrecio = document.getElementById(`pre-${id}`).value;
      const nuevoStock = document.getElementById(`stk-${id}`).value;
      const nuevaImg = document.getElementById(`img-${id}`).value;

      const productoActualizado = {
        id: id,
        nombre: nuevoNombre,
        precio: parseFloat(nuevoPrecio),
        stock: parseInt(nuevoStock),
        img: nuevaImg,
        descripcion: inventario.find(p => p.id === id).descripcion 
      };

      const response = await fetch(`http://localhost:8080/api/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado)
      });

      if (response.ok) {
        alert("¡Producto actualizado con éxito!");
        cargarProductos(); 
      } else {
        alert("Error al actualizar en el servidor");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    }
  };

  const cerrarSesion = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
    navigate('/login');
  };

  return (
    <main className="container py-5">
      <div className="admin-header d-flex justify-content-between align-items-center mb-4">
        <h1>Panel de Control Inventario</h1>
        <button onClick={cerrarSesion} className="btn-logout-admin">Cerrar Sesión Admin</button>
      </div>

      <section className="admin-card shadow">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio ($)</th>
              <th>Stock (kg)</th>
              <th>Imagen (archivo)</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {inventario.map(p => (
              <tr key={p.id}>
                <td>
                  <input type="text" defaultValue={p.nombre} id={`nom-${p.id}`} className="form-control-sm" />
                </td>
                <td>
                  <input type="number" defaultValue={p.precio} id={`pre-${p.id}`} className="form-control-sm" style={{width: '80px'}} />
                </td>
                <td>
                  <input type="number" defaultValue={p.stock} id={`stk-${p.id}`} className="form-control-sm" style={{width: '70px'}} />
                </td>
                <td>
                  <input 
                    type="text" 
                    defaultValue={p.img} 
                    id={`img-${p.id}`} 
                    className="form-control-sm" 
                    placeholder="ej: pera.jpg"
                  />
                </td>
                <td>
                  <button onClick={() => guardarCambios(p.id)} className="btn-save">
                    Guardar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}