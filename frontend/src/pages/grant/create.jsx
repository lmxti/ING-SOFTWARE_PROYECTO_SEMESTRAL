// <-----------------  BIBLIOTECAS ----------------->
import { useEffect, useState } from "react";
// <----------------- COMPONENTES --------------->
import NavBar from '@/components/NavBar'
import Select from "react-select";
// <--------------- SERVICIOS ---------------->
import { createGrant } from "@/services/grant.service";
import { getRequirements } from "@/services/requirement.service";
// <----------------- ICONOS ----------------->
import { IoClose } from "react-icons/io5";



const CreateGrant = () => {

  const documents = require('../../../../backend/src/constants/documents.constants')

  const [isNameAvailable, setIsNameAvailable] = useState(true);

  // Formulario de creación de beca (grant) por defecto vacio
  const [grant, setGrant] = useState({
    name: "",
    requirements: [""],
    documents: [],
    amount: "",
  });

  // Función que actualiza el formulario de creación de beca
  const onChange = (e) => {
    const { name, value } = e.target;

    setGrant((prevGrant) => ({
      ...prevGrant,
      [name]: name === 'documents' ? [value] : (name === 'requirements' ? [value] : value),
    }));
  };


  // <------------------------------------ REQUERIMIENTOS ------------------------------------>
  
  // Lista de requerimientos por defecto vacia
  const [requirements, setRequirements] = useState([]);

  // Función que obtiene los requerimientos de la base de datos
  const getRequirement = async () => {
    try {
      const response = await getRequirements();
      setRequirements(response.data.data.requirements);
      console.log("Requirements", response.data.data.requirements);
    } catch (error) {
      console.log("Error getRequirements", error);
    }
  };
  // Al renderizar la página se obtienen los requerimientos
  useEffect(() => {
    getRequirement();
  }, []);

  
  // <----------------------------- SOLICITUD DE CREACION DE BECA ---------------------------->
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Grant", grant);
    // Verificacion de que existan requerimientos seleccionados para la beca
    if (grant.requirements.every(req => req !== "")) {
        try {
          // Solicitud de creación de beca
          const response = await createGrant(grant);
          alert("¡La beca se ha creado exitosamente!");

        } 
        catch (error) {
          console.log("Error LoginForm", error);
          alert("¡Hubo un error al crear la beca!");
        }
    } else {
      // Si no hay requerimientos seleccionados, se muestra un mensaje de alerta
      alert("Debes seleccionar al menos un requerimiento.");
    }
  }


  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center my-4">
        <div className="bg-blue-50 p-12 rounded-2xl shadow-xl w-[600px]">

          <div>
            <h1 className="text-3xl font-bold text-center mb-4">
              Crear una nueva beca
            </h1>
            <p className="text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">
              Contenido explicativo sobre crear beca
            </p>
          </div>

          {/* Formulario */}
          <form className="space-y-4" onSubmit={onSubmit}>

          <input required placeholder="Ingresa nombre de beca" name="name" value={grant.name} onChange={onChange}
                className="block w-full p-2 rounded-lg border outline-border" />
        

              <Select
                  
                  isMulti
                  placeholder="Selecciona requerimientos"
                  options={requirements.map((req) => ({
                    value: req._id,
                    label: req.name,
                  }))}
                  onChange={(selectedOptions) =>
                    setGrant((prevGrant) => ({
                      ...prevGrant,
                      requirements: selectedOptions.map((option) => option.value),
                    }))
                  }
              />

              <Select
                  isMulti
                  placeholder="Selecciona documentos"
                  options={documents.map((doc) => ({
                    value: doc,
                    label: doc,
                  }))}
                  onChange={(selectedOptions) =>
                    setGrant((prevGrant) => ({
                      ...prevGrant,
                      documents: selectedOptions.map((option) => option.value),
                    }))
                  }
              />

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  $
                </span>
                <input
                  required
                  placeholder="Ingrese monto de beca"
                  type="number"
                  name="amount"
                  value={grant.amount}
                  onChange={onChange}
                  className="block w-full pl-8 pr-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div className="text-center mt-6">
                <button className="py-3 w-64 text-xl text-white bg-blue-500 rounded-2xl">
                  Publicar beca
                </button>
              </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateGrant;
