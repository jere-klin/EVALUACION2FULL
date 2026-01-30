import React from 'react';

export default function Cart({ items, totalBackend, vaciarCarrito, eliminarDelCarrito, usuarioId, setActualizar }) {
  
  
  const handleFinalizarCompra = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/compra/${usuarioId}`, {
        method: 'POST'
      });

      if (response.ok) {
        const data = await response.json();
        alert(`¡Gracias por su compra! Orden N°: ${data.id}`);
        vaciarCarrito(); 
      } else {
        alert("Hubo un problema con el stock o el carrito.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="cart-container shadow-sm p-4 bg-light rounded">
        <h2 className="mb-4">🛒 Mi Pedido </h2>
        <hr />

        {items.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted fs-5">Tu carrito está vacío.</p>
            <a href="/catalogo" className="btn btn-primary">Ir al Catálogo</a>
          </div>
        ) : (
          <>
            <div className="list-group mb-3">
              {items.map((item) => (
                <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center border-0 border-bottom bg-transparent">
                  <div>
                  
                    <h6 className="my-0 fw-bold">{item.producto.nombre}</h6>
                    <small className="text-muted">Cant: {item.cantidad} x ${item.producto.precio}</small>
                  </div>
                  <div className="text-end">
                    <span className="d-block fw-bold text-success">${item.producto.precio * item.cantidad}</span>
                    <button 
                      className="btn btn-sm text-danger p-0"
                      onClick={() => eliminarDelCarrito(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-top pt-3 mt-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fs-4 fw-bold">Total a pagar:</span>
                
                <span className="fs-3 fw-bold text-primary">${totalBackend}</span>
              </div>
              
              <div className="d-grid gap-2">
                <button className="btn btn-success btn-lg" onClick={handleFinalizarCompra}>
                  Finalizar Compra
                </button>
                <button className="btn btn-link text-danger btn-sm" onClick={vaciarCarrito}>
                  Vaciar todo el carrito
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}