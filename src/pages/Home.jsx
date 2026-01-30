import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <h1 id="main-greeting">HUERTO HOGAR PARA TODOS</h1>
      <p className="texto">
        Delivery de frutas, verduras y mas..<br />
        Compra desde la comodidad de tu casa.. al mejor precio..
      </p>
          
      
      <Link to="/catalogo" className="btn-principal">
        Ver Productos
      </Link>

      
      <img 
        width="400px" 
        src="assets/fotos/logo.png" 
        alt="Huerto hogar imagen" 
        className="imagen-bajo-texto" 
      />
      
      <img 
        width="700px" 
        src="https://vegetalesyfrutas.cl/wp-content/uploads/2025/12/fruta-mas-premium-de-stgo-escritorio.webp" 
        alt="registra-imagen" 
        className="registra-imagen" 
      />
    </>
  );
}