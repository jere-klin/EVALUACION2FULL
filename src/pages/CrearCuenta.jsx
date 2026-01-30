import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CrearCuenta() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [mensaje, setMensaje] = useState({ texto: '', color: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMensaje({ texto: '❌ Las contraseñas no coinciden.', color: 'red' });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        setMensaje({ texto: '✅ ¡Cuenta creada con éxito! Redirigiendo...', color: 'green' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMensaje({ texto: '❌ Error al registrar. El email podría ya existir.', color: 'red' });
      }
    } catch (error) {
      setMensaje({ texto: '❌ Error de conexión con el servidor.', color: 'red' });
    }
  };

  return (
    <main>
      <section className="cuenta">
        <h1>CREAR CUENTA</h1>
        <form onSubmit={handleSubmit}>
          <p>
            <label>Nombre de Usuario:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </p>
          <p>
            <label>Correo Electrónico:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </p>
          <p>
            <label>Contraseña:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength="8" />
          </p>
          <p>
            <label>Confirmar Contraseña:</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </p>
          <button type="submit" className="submit">Crear Cuenta</button>
        </form>
        {mensaje.texto && <div style={{ color: mensaje.color, textAlign: 'center', marginTop: '10px' }}>{mensaje.texto}</div>}
      </section>
    </main>
  );
}