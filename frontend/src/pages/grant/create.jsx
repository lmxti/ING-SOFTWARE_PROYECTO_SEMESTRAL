// <-----------------  BIBLIOTECAS ----------------->
import { useEffect, useState } from "react";
// <----------------- COMPONENTES --------------->
import NavBar from '@/components/NavBar'
// <--------------- SERVICIOS ---------------->
import { createGrant } from "@/services/grant.service";
import { getRequirements } from "@/services/requirement.service";
// <----------------- ICONOS ----------------->
import { IoClose } from "react-icons/io5";

const CreateGrant = () => {

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
    setGrant((prevState) => {
      return {
        ...prevState,
        [name]: ['requirements', 'documents'].includes(name) ? (value ? value.split(',') : []) : value,
      };
    });
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

  // <-------- FUNCION PARA AGREGAR UN REQUERIMIENTO AL ARRAY -------->
  const agregarRequerimiento = () => {
    setGrant((prevState) => ({
      ...prevState,
      requirements: [...prevState.requirements, ""],
    }));
  };
  
  // <------- FUNCION PARA ELIMINAR UN REQUERIMIENTO DEL ARRAY ------->
  const eliminarRequerimiento = (index) => {
    if (grant.requirements.length > 1) {
      const updatedRequirements = [...grant.requirements];
      updatedRequirements.splice(index, 1);
      setGrant((prevState) => ({
        ...prevState,
        requirements: updatedRequirements,
      }));
    } else{
      alert("Debes tener al menos un requerimiento");
    }
  };
  
  // Funcion que actualiza valor de requerimiento en el listado del formulario de creación de beca
  const handleRequirementChange = (index, e) => {
    // updateRequirement almacena los requerimientos actuales
    const updatedRequirements = [...grant.requirements];
    // Se actualiza el requerimiento en la posición index
    updatedRequirements[index] = e.target.value;
    // Se actualiza el listado de requerimientos del formulario
    setGrant((prevState) => ({
      ...prevState,
      requirements: updatedRequirements,
    }));
  };
  
  // <----------------------------- SOLICITUD DE CREACION DE BECA ---------------------------->
  const onSubmit = async (e) => {
    e.preventDefault();

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
            
              <div className="space-y-4">
                {grant.requirements.map((requirement, index) => (
                  <div key={index} className="flex" >
                    <select required onChange={(e) => handleRequirementChange(index, e)} value={requirement}
                      className="w-full p-4 rounded-lg border outline-border" placeholder
                    >
                      <option defaultChecked >Selecciona requerimiento de beca</option>
                      {requirements.map((req) => (
                        <option key={req._id} value={req._id}>
                          {req.name}
                        </option>
                      ))}
                    </select>
                    <button className="flex justify-center items-center bg-blue-200 mx-1 px-3 rounded-2xl" type="button" onClick={() => eliminarRequerimiento(index)}>
                      <IoClose size={30}/>
                    </button>
                  </div>
                ))}
              </div>

              <button type="button" onClick={agregarRequerimiento} className="block w-full p-2 rounded-lg border outline-border bg-blue-200">
                Agregar Requerimiento
              </button>

              <input required placeholder="Documentos" name="documents" value={grant.documents} onChange={onChange}
                className="block w-full p-2 rounded-lg border outline-border"/>

              <input required placeholder="Monto" type="number" name="amount" value={grant.amount} onChange={onChange}
                className="block w-full p-2 rounded-lg border outline-border"/>

              <div className="text-center mt-6">
                <button className="py-3 w-64 text-xl text-white bg-blue-500 rounded-2xl">
                  Crear cuenta
                </button>
              </div>
          </form>

          

        </div>
      </div>
    </>
  )
}

export default CreateGrant;
