import React from 'react'

const RegisterForm = ({ onSwitchMode }) => {
  return (
    <div className="text-black min-h-screen bg-purple-400 flex justify-center items-center">
	<div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
</div>
	<div className="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block">
	</div>
	<div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
		<div>
			<h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
				Crea una cuenta
			</h1>
			<p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
				Crea una cuenta para acceder a todo el contenido de la plataforma.
			</p>
		</div>
		<div className="space-y-4">
			<input type="text" placeholder="Nombre" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
			<input type="text" placeholder="Apellido" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
			<input type="text" placeholder="Rut" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />

			<div className="relative">
				<select className="appearance-none w-full text-gray-700 py-3 px-4 border rounded-lg focus:outline-none">
					<option>Genero</option>
					<option>Masculino</option>
					<option>Femenino</option>
				</select>
				<span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
					<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4">
						<path d="M6 9l6 6 6-6"></path>
					</svg>
				</span>
			 </div>

			 {/* Fecha nacimiento */}

			{/* Direccion */}
			<input type="text" placeholder="Direccion" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
			{/* Celular */}
			<input type="text" placeholder="Celular" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
			{/* Email */}
			<input type="text" placeholder="Email" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
			{/* Password */}
			<input type="text" placeholder="Contraseña" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />


    </div>
			<div className="text-center mt-6">
				<button className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">Create Account</button>
				<p className="mt-4 text-sm">
					Already Have An Account? 
					<span className="underline cursor-pointer" onClick={onSwitchMode}> 
						Sign In
					</span>
				</p>
			</div>
		</div>
	</div>
  )
}

export default RegisterForm