// <-----------------  BIBLIOTECAS ----------------->
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// <----------------- COMPONENTES --------------->
import NavBar from "@/components/NavBar";
import Mensajes from "@/components/mensajes";

// <--------------- SERVICIOS ---------------->
import { useAuth } from '../../context/AuthContext';
import { createApplication } from "@/services/application.service";
import { getGrants } from "@/services/grant.service";
import { getPersonById } from "@/services/person.service";




const Applications = () => {
  const router = useRouter();

  const { user: currentUser } = useAuth();

  // Datos de la persona
  const [dataUser, setDataUser] = useState([]);
  // Becas disponibles para postular
  const [grantOptions, setGrantOptions] = useState([]);


  
  
  
  
  // Funcion para obtener los datos de la persona
  const setPersonData = async () => {
    try {
      const response = await getPersonById(currentUser.id);
      setDataUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  // Funcion para obtener las becas disponibles
  const setGrants = async () => {
    try {
      const response = await getGrants();
      setGrantOptions(response.data.data.data);
      console.log("Estas son las becas: ",response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setPersonData();
    setGrants();
  }, []);



  const subirPDF = () => {
    router.push("/pdfs/subidaPDF");
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try{
      await createApplication(formData);
      console.log(formData);
      Mensajes.mensajeExito("Postulación enviada exitosamente");
    } catch (error) {
      console.error("Error en la solicitud de postulación:", error.response.data);
      Mensajes.mensajeError(error.response.data.message);
    }
  };

  const [formData, setFormData] = useState({
    person: {
      name: "",
      surname: "",
      rut: "",
      gender: "",
      address: "",
      phone: "",
      email: "",
    },
    grant: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      person: {
        ...formData.person,
        [e.target.name]: e.target.value,
      },
    });
  };
  
  const handleGrantChange = (e) => {
    setFormData({
      ...formData,
      grant: e.target.value,
    });
  };
  
  useEffect(() => {
    // Actualiza el estado del formulario después de cargar los datos del usuario
    if (dataUser) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        person: {
          ...prevFormData.person,
          name: dataUser.name || "",
          surname: dataUser.surname || "",
          rut: dataUser.rut || "",
          gender: dataUser.gender || "",
          address: dataUser.address || "",
          phone: dataUser.phone || "",
          email: dataUser.email || "",
        },
      }));
    }
  }, [dataUser]);
  

  



  return (
    <>
    <NavBar />

    <div className="min-h-screen flex justify-center items-center text-black">
            <div className="py-12 px-12 bg-blue-100 rounded-2xl shadow-xl z-20">
                <div>
                    <h1 className="text-3xl font-bold text-center mb-4">
                        Postula a una beca
                    </h1>
                    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">
                        Contenido explicativo para crear solicitud
                    </p>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="space-y-2">

                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Nombres
                        </label>
                        <input type="text" name="name" id="name"  value={formData.person.name} onChange={handleInputChange}
                              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />


                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Apellidos
                        </label>
                        <input type="text" name="surname" id="surname" value={formData.person.surname} onChange={handleInputChange}
                          className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />


                        <div className="flex items-center space-x-2 space-y-2">
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                            Rut
                          </label>
                          <input type="text" name="rut" id="rut"  value={formData.person.rut} onChange={handleInputChange}
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                            />

                          <label className="block text-sm font-medium leading-6 text-gray-900" >
                            Genero
                          </label>
                          <select id="gender" name="gender" onChange={handleInputChange} value={formData.person.gender}
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                            >
                              <option>Selecciona un genero</option>
                              <option>Masculino</option>
                              <option>Femenino</option>
                          </select>
                        </div>

                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Direccion
                        </label>
                        <input type="text" name="address" id="address" value={formData.person.address} onChange={handleInputChange}
                          className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />

                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Telefono
                        </label>
                        <input type="text" name="phone" id="phone"  value={formData.person.phone} onChange={handleInputChange}
                          className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />

                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Correo electronico
                        </label>
                        <input type="text" name="email" id="email"  value={formData.person.email} onChange={handleInputChange}
                          className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        </div>
                        <div className="">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Beca
                        </label>
                        <div className="mt-2">
                          <select
                            name="grant"
                            id="grant"
                            onChange={handleGrantChange}
                            value={formData.person.grant}
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                          >
                            <option value="">Selecciona una beca</option>
                              {grantOptions.map((grant) => (
                            <option key={grant.id} value={grant.id}>
                            {grant.name}
                              </option>
                                ))}
                            </select>
                            </div>
                          </div>
                    <div className="text-center mt-6">
                        <button type="submit" className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">
                            Postular
                        </button>
                    </div>
                </form>
                <div className="text-center mt-6">
                <button className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl cursor-pointer" onClick={subirPDF}>
            Subir documentos
      </button>
      </div>
            </div>
    </div>
    </>
  );
}

export default Applications;
