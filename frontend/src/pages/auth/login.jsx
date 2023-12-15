import { useState, useEffect} from 'react';
import { logout } from '@/services/auth.service';
import LoginForm from '@/components/LoginForm';

const Login = () => {


  const [userLoggedIn, setUserLoggedIn] = useState(false);

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
      <h2>Ya estas loggeado</h2>
          <button onClick={() => {
            logout();
            setUserLoggedIn(false);
          }}
          >
          Cerrar sesión
        </button>
      </div>
    )
  }

  return (
    <LoginForm />
  );
}

export default Login;
