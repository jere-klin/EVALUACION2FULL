import React, { useState, useEffect } from 'react';

export default function Catalogo({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([]);

  
  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then(response => response.json())
      .then(data => {
        console.log("Datos cargados:", data);
        setProductos(data);
      })
      .catch(error => console.error("Error cargando productos:", error));
  }, []);

  return (
    <main>
      <h1>Catálogo de Productos</h1>

      <div className="catalogo" id="product-list">
        {productos.map((p) => (
          <div className="producto" key={p.id}>
            
            
            <img 
              src={`/assets/fotos/${p.img || 'placeholder.jpg'}`} 
              alt={p.nombre} 
              
              onError={(e) => { e.target.src = '/assets/fotos/placeholder.jpg'; }}
            />

            <div className="producto-info">
              <h3 style={{ textTransform: 'capitalize' }}>{p.nombre}</h3>
              <p>{p.descripcion}</p> 
              
              <p style={{ fontSize: '0.9em', color: '#555' }}>
                Disponibles: <span id={`stock-${p.id}`}>{p.stock}</span> kg
              </p>
              
              <div className="precio">
                ${p.precio} pesos el kg.
              </div>
              
              <button 
                onClick={() => agregarAlCarrito(p)}
                disabled={p.stock <= 0} 
                className={p.stock <= 0 ? "btn-agotado" : "btn-agregar"}
              >
                {p.stock <= 0 ? 'Sin Stock' : 'Agregar al carrito'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}