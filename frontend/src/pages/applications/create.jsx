import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { createApplication } from "@/services/application.service";
import { getGrants } from "@/services/grant.service";
import Mensajes from "@/components/mensajes";
import { useRouter } from "next/router";

const Applications = () => {
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
  const router = useRouter();

  const [grantOptions, setGrantOptions] = useState([]);

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        const grants = await getGrants();
        setGrantOptions(grants.data.data.data);
      } catch (error) {
        console.error("Error al obtener becas:", error);
      }
    };

    fetchGrants();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      person: {
        ...prevData.person,
        [name]: value,
      },
      grant: name === "grant" ? value : prevData.grant,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createApplication(formData);
      Mensajes.mensajeExito("Postulación enviada exitosamente");
    } catch (error) {
      console.error(
        "Error en la solicitud de postulación:", error.response.data);
      Mensajes.mensajeError(error.response.data.message);
    }
  };

  const subirPDF = () => {
    router.push("/pdfs/subidaPDF");
  }

  return (
    <>
    <NavBar />
    <form onSubmit={handleSubmit} className="m-4">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900 flex justify-center">
          Formulario de postulación
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nombres
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="given-name"
                onChange={handleInputChange}
                value={formData.person.name}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="surname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Apellidos
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="surname"
                id="surname"
                autoComplete="given-surname"
                onChange={handleInputChange}
                value={formData.person.surname}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="rut"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Rut
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="rut"
                id="rut"
                autoComplete="given-rut"
                onChange={handleInputChange}
                value={formData.person.rut}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="gender"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Genero
            </label>
            <div className="mt-2">
              <select
                id="gender"
                name="gender"
                value={formData.person.gender}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="">Selecciona un genero</option>
                <option>Masculino</option>
                <option>Femenino</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Direccion
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="address"
                id="address"
                autoComplete="given-address"
                onChange={handleInputChange}
                value={formData.person.address}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Telefono
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="phone"
                id="phone"
                autoComplete="given-phone"
                onChange={handleInputChange}
                value={formData.person.phone}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Correo electronico
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="given-email"
                onChange={handleInputChange}
                value={formData.person.email}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="grant"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Beca
            </label>
            <div className="mt-2">
              <select
                name="grant"
                id="grant"
                onChange={handleInputChange}
                value={formData.grant}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Enviar Postulación
      </button>
      <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={subirPDF}>
            <h3 className="text-lg font-semibold mb-4">Subir documentos</h3>
      </div>
    </form>
    </>
  );
}

export default Applications;
