import { useState } from 'react'
import { useRouter } from 'next/router';
import { login } from '../services/auth.service';

const LoginForm = ({ onSwitchMode }) => {

    const router = useRouter();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value   
        }));
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(credentials);
            await login(credentials);
            router.push("/");
        } catch (error) {
            console.log("Error LoginForm", error);
        }
    };

  return (
    <div className="min-h-screen bg-slate-800 flex justify-center items-center text-black">
            <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                <div>
                    <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
                        Inicia sesión
                    </h1>
                    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
                        Inicia sesión con tu cuenta para acceder a todo el contenido de la plataforma.
                    </p>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <input type="email" name="email" placeholder="Email" required
                            onChange={handleChange} value={credentials.email}
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                        <input type="password" name="password" placeholder="Contraseña" required
                            onChange={handleChange} value={credentials.password}
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                    </div>


                    <div className="text-center mt-6">
                        <button className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">
                            Iniciar sesión
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-sm">
                    ¿No tienes una cuenta? 
                    <span className="underline cursor-pointer" onClick={ () => router.push("/register")}>
                        Registrate
                    </span>
                </p>
            </div>
    </div>
  )
}

export default LoginForm