import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/usuarios');
      const usuarios = await response.json();

      const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === pass);

      if (usuarioEncontrado) {
        localStorage.setItem('usuarioId', usuarioEncontrado.id);
        localStorage.setItem('nombrePersona', usuarioEncontrado.nombre);
        localStorage.setItem('rolUsuario', usuarioEncontrado.email === 'admin@correo.com' ? 'admin' : 'cliente');
        
        
        window.dispatchEvent(new Event("storage"));
        navigate('/');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <main>
      <section className="cuenta">
        <h1>INICIAR SESIÓN</h1>
        <form onSubmit={handleLogin}>
          <p>
            <label>Correo Electrónico:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </p>
          <p>
            <label>Contraseña:</label>
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
          </p>
          <button type="submit" className="submit">Ingresar</button>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </section>
    </main>
  );
}