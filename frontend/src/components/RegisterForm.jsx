import { useState } from "react";
import { useRouter } from "next/router";

const RegisterForm = ({ onSwitchMode }) => {
  const router = useRouter();

  const [registerCredentials, setRegisterCredentials] = useState({
    name: "",
    surname: "",
    rut: "",
    gender: "",
    birthdate: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    role: ["user"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(registerCredentials);
  };

  return (
	<div className="text-black min-h-screen bg-slate-800 flex justify-center items-center">
      <div className="p-6 bg-white rounded-lg shadow-xl max-h-screen overflow-y-auto">
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            Crea una cuenta
          </h1>
          <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
            Crea una cuenta para acceder a todo el contenido de la plataforma.
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="space-y-4">

			{/* Nombre */}
            <input type="text" placeholder="Nombre" name="name" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" 
            	onChange={handleChange} value={registerCredentials.name}/>

			{/* Apellido */}
			<input type="text" placeholder="Apellido" name="surname" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
				onChange={handleChange} value={registerCredentials.surname} />

			{/* Rut */}
			<input type="text" placeholder="Rut" name="rut" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
				onChange={handleChange} value={registerCredentials.rut} />
			
			{/* Género */}
			<div className="relative">
				<select placeholder="Genero" name="gender" className="appearance-none w-full text-gray-700 py-3 px-4 border rounded-lg focus:outline-none"
				  onChange={handleChange} value={registerCredentials.gender}
				>
					<option value="">Género</option>
					<option value="Masculino">Masculino</option>
					<option value="Femenino">Femenino</option>
				</select>
				<span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
					<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4">
						<path d="M6 9l6 6 6-6"></path>
					</svg>
				</span>
			</div>
			{/* Birthday FORMATEAR FECHA */}
			<input type="date" placeholder="Fecha de nacimiento" name="birthdate" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
				onChange={handleChange} value={registerCredentials.birthdate} />

			{/* Dirección */}
			<input type="text" placeholder="Dirección" name="address" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
				onChange={handleChange} value={registerCredentials.address} />

			{/* Teléfono */}
			<input type="text" placeholder="Teléfono" name="phone" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
				onChange={handleChange} value={registerCredentials.phone} />

			{/* Email */}
			<input type="email" placeholder="Email" name="email" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
				onChange={handleChange} value={registerCredentials.email} />

			{/* Password */}
			<input type="password" placeholder="Contraseña" name="password" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
				onChange={handleChange} value={registerCredentials.password} />
			

			</div>

          <div className="text-center mt-6">
            <button className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">
              Crear cuenta
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm">
			¿Ya tienes una cuenta?
          <span className="underline cursor-pointer" onClick={onSwitchMode}>
		  	Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
