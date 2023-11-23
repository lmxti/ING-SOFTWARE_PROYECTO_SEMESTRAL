import React, { useState } from "react";
import ApplicationsForm from "../components/ApplicationsForm";
import applicationService from "../services/application.service";

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
      await applicationService(formData);
    } catch (error) {
      console.error(
        "Error en la solicitud de postulación:", error.response.data);
      // Puedes mostrar un mensaje de error al usuario o realizar otras acciones necesarias
    }
  };

  return (
    <ApplicationsForm
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default Applications;
