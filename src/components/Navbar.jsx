import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

export default function Navbar({ totalItems }) {
  const navigate = useNavigate();
  
  
  const usuarioId = localStorage.getItem('usuarioId');
  const nombreUsuario = localStorage.getItem('nombrePersona');

  const handleLogout = () => {
    if (window.confirm("¿Cerrar sesión?")) {
      localStorage.clear(); 
      
      window.dispatchEvent(new Event("storage"));
      navigate('/login');
    }
  };

  return (
    <nav className="navbar-container">
      <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Inicio</NavLink>
      <NavLink to="/catalogo" className={({ isActive }) => isActive ? "active-link" : ""}>Catálogo</NavLink>

      {!usuarioId ? (
        <>
          <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>Iniciar Sesión</NavLink>
          <NavLink to="/registro" className={({ isActive }) => isActive ? "active-link" : ""}>Registro</NavLink>
        </>
      ) : (
        <>
          
          <span className="user-welcome">Hola, <strong>{nombreUsuario}</strong></span>
          <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
        </>
      )}
      
      <Link to="/cart" className="cart-container" style={{ textDecoration: 'none' }}>
        🛒 <span className="cart-badge">{totalItems}</span>
      </Link>
    </nav>
  );
}