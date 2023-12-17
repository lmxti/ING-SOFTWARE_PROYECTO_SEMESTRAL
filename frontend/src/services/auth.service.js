import axios from './root.service';
import cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Mensajes from '@/components/mensajes';

export const login = async ({ email, password }) => {
    try {
      const response = await axios.post('auth/login', {
        email,
        password,
      });
      const { status, data } = response;
      if (status === 200) {
        const { email, role, id } = await jwtDecode(data.data.accessToken);
        localStorage.setItem('user', JSON.stringify({ email, role, id }));
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.data.accessToken}`;
        cookies.set('jwt-auth', data.data.accessToken, { path: '/' });
      }
      Mensajes.mensajeExito("Bienvenido");
    } catch (error) {
      console.log(error.response.data.message);
      Mensajes.mensajeError(error.response.data.message);
    }
  };

export const logout = () => {
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    cookies.remove('jwt-auth');
};