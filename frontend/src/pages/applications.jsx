import React, { useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import ApplicationsForm from "../components/ApplicationsForm";

const Applications = () => {
    const router = useRouter();


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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      person: {
        ...prevData.person,
        [name]: value,
      },
      grant: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    try {
      const token = cookies.get("jwt-auth");
      const response = await axios.post(
        "http://localhost:3000/api/applications/",
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
          },
        }
      );
      // Puedes redirigir al usuario o realizar otras acciones después de enviar la solicitud
    } catch (error) {
      console.error(
        "Error en la solicitud de postulación:",
        error.response.data
      );
      // Puedes mostrar un mensaje de error al usuario o realizar otras acciones necesarias
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Información Personal
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

          <div class="sm:col-span-3">
            <label
              for="gender"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Genero
            </label>
            <div class="mt-2">
              <select
                id="gender"
                name="gender"
                value={formData.person.gender}
                onChange={handleInputChange}
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
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
              <input
                type="text"
                name="grant"
                id="grant"
                onChange={handleInputChange}
                value={formData.grant}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
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
    </form>
  );
}

export default Applications;
