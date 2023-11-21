import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useRouter } from 'next/router';
import { logout } from '@/services/auth.service';
import RegisterForm from '@/components/RegisterForm';

const Login = () => {
  const router = useRouter();

  // El usuario esta loggeado?
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // Variable que cargara el formulario de registro
  const [register, setRegister] = useState(true);

  const switchToRegisterMode = () => {
    setRegister(!register);
  };

  useEffect(() => {
    // Verificar si el usuario está autenticado después de que la página se haya cargado en el cliente
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      setUserLoggedIn(!!user); // Convierte a booleano
    }
  }, []);

  if (userLoggedIn) {
    return (
      <div>
        <h2>¡Ya estás logeado!</h2>
        {/* Botton para cerrar sesion y recargar pagina */}
        <button
          onClick={() => {
            logout();
            router.reload('/login');
          }}
        >
          Cerrar sesión
        </button>
        <br />
        <button onClick={() => router.push('/')}>Ir a home</button>
      </div>
    );
  }

  return (
    <div>
      {/* Si register es true, se muestra el formulario de registro */}
      
      {
        register ? (
          <RegisterForm onSwitchMode={ switchToRegisterMode } />
        ) : (
          <LoginForm  onSwitchMode={ switchToRegisterMode } />
        )
      }
      
    </div>
  );
};

export default Login;
