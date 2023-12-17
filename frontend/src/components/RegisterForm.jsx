import { useState } from "react";
import { useRouter } from "next/router";
import { register } from "@/services/person.service";
import Mensajes from "./mensajes";

const RegisterForm = () => {
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

  // Función para validar un RUT
const validarRut = (rut) => {
  // Expresión regular para validar el formato del RUT
  const rutRegex = /^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/;

  if (!rutRegex.test(rut)) {
    return false; // El formato del RUT es incorrecto
  }

  // Separar el número y el dígito verificador
  const [numero, dv] = rut.replace(".", "").split("-");
  const numeroArray = numero.split("").reverse();

  // Calcular el dígito verificador esperado
  let acumulado = 0;
  let multiplicador = 2;

  for (let i = 0; i < numeroArray.length; i++) {
    acumulado += parseInt(numeroArray[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = acumulado % 11;
  const dvCalculado = 11 - resto;

  const dvEsperado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();

  return dv.toUpperCase() === dvEsperado; // Devuelve true si el RUT es válido
};


  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validarRut(registerCredentials.rut)) {
      Mensajes.mensajeError("Rut no valido");
      return;
    }
    try {
       const resultado = await register(registerCredentials);

        console.log("se creo el usuario", resultado.data.data.name);
        console.log("status",resultado.status);

        if(resultado.status === 201){
          Mensajes.mensajeExito("Usuario creado exitosamente");
          router.push("/auth/login");
        }

    } catch (error) {
      console.log("Error en RegisterForm", error.response.data.message);
      const mensaje = error.response.data.message;
      Mensajes.mensajeError(mensaje);
    }
  };

  return (
    <div className="bg-slate-800 min-h-screen flex justify-center items-center">
       <div className="bg-white p-12 rounded-xl z-20">
            <div>
                <h1 className="text-3xl font-bold text-center mb-4">
                    Registrate
                </h1>
                <p className="text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">
                    Registrate para acceder a todo el contenido de la plataforma.
                </p>
            </div>

            <form onSubmit={onSubmit}>
                <div className="space-y-3">
                    <input placeholder="Nombre" type="text" name="name" onChange={handleChange} value={registerCredentials.name}
                      className="block w-full p-2 rounded-lg border outline-border"/>

                    <input placeholder="Apellido" type="text" name="surname"  onChange={handleChange} value={registerCredentials.surname}
                      className="block w-full p-2 rounded-lg border outline-border" />

                    <input placeholder="Rut" type="text" name="rut" onChange={handleChange} value={registerCredentials.rut} 
                      className="block w-full p-2 rounded-lg border outline-border"/>

                    <select placeholder="Género" type="text" name="gender" onChange={handleChange} value={registerCredentials.gender}
                      className="block w-full p-2 rounded-lg border outline-border">
                        <option value="" selected disabled>Selecciona género</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>


                    <input placeholder="Fecha de Nacimiento" type="date" name="birthdate" onChange={handleChange} value={registerCredentials.birthdate}
                      className="block w-full p-2 rounded-lg border outline-border" />

                    <input placeholder="Direccion" type="text" name="address" onChange={handleChange} value={registerCredentials.address}
                      className="block w-full p-2 rounded-lg border outline-border"/>

                    <input placeholder="Celular" type="text" name="phone"  onChange={handleChange} value={registerCredentials.phone}
                      className="block w-full p-2 rounded-lg border outline-border"/>

                    <input placeholder="Correo" type="email" name="email" onChange={handleChange} value={registerCredentials.email}
                      className="block w-full p-2 rounded-lg border outline-border"/>

                    <input placeholder="Contraseña" type="text" name="password" onChange={handleChange} value={registerCredentials.password}
                      className="block w-full p-2 rounded-lg border outline-border"/>

                </div>
                <div className="text-center mt-6">
                    <button className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">
                      Crear cuenta
                    </button>
                </div>
            </form>
            <p className="mt-4 text-sm">
                    ¿No tienes una cuenta? 
                    <span className="underline cursor-pointer" onClick={ () => router.push("/auth/login")}>
                        Inicia sesión
                    </span>
            </p>

       </div>
    </div>
  );
};

export default RegisterForm;
