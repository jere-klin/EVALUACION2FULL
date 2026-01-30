import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        <div className="footer-section">
          <h3>Huerto Hogar</h3>
          <p>Cultivando frescura directamente para tu hogar. Calidad garantizada en cada entrega.</p>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <p><span className="footer-icon">📧</span> contacto@huertohogar.cl</p>
          <p><span className="footer-icon">📍</span> Santiago, Chile</p>
          <p><span className="footer-icon">📞</span> +56 9 1234 5678</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Huerto Hogar - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}