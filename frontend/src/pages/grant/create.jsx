import { useEffect, useState } from "react";
import NavBar from '@/components/NavBar'
import { createGrant } from "@/services/grant.service";
import { getRequirements } from "@/services/requirement.service";
import { IoClose } from "react-icons/io5";

const CreateGrant = () => {

  const [grant, setGrant] = useState({
    name: "",
    requirements: [], // Inicialmente, el array de requerimientos está vacío
    documents: [],
    amount: "",
  });

  const [requirements, setRequirements] = useState([]);

  const getRequirement = async () => {
    try {
      const response = await getRequirements();
      setRequirements(response.data.data.requirements);
    } catch (error) {
      console.log("Error getRequirements", error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setGrant((prevState) => {
      // Si el campo es 'requirements' o 'documents', convierte la cadena a un array usando split(',')
      // De lo contrario, actualiza el estado normalmente
      return {
        ...prevState,
        [name]: ['requirements', 'documents'].includes(name) ? value.split(',') : value,
      };
    });
  };

  const agregarRequerimiento = () => {
    setGrant((prevState) => ({
      ...prevState,
      requirements: [...prevState.requirements, ""],
    }));
  };

  const eliminarRequerimiento = (index) => {
    const updatedRequirements = [...grant.requirements];
    updatedRequirements.splice(index, 1);
    setGrant((prevState) => ({
      ...prevState,
      requirements: updatedRequirements,
    }));
  };

  const handleRequirementChange = (index, e) => {
    const updatedRequirements = [...grant.requirements];
    updatedRequirements[index] = e.target.value;
    setGrant((prevState) => ({
      ...prevState,
      requirements: updatedRequirements,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Grant", grant);
      const response = await createGrant(grant);
      alert("¡La beca se ha creado exitosamente!");
    } catch (error) {
      console.log("Error LoginForm", error);
      alert("¡Hubo un error al crear la beca!");
    }
  }

  useEffect(() => {
    getRequirement();
  }, []);

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

          <form className="space-y-4" onSubmit={onSubmit}>
            <input
              placeholder="Nombre beca"
              onChange={onChange}
              name="name"
              value={grant.name}
              className="block w-full p-2 rounded-lg border outline-border"
            />

            <div className="space-y-4">
              {grant.requirements.map((requirement, index) => (
                <div key={index} className="flex" >
                  <select onChange={(e) => handleRequirementChange(index, e)} value={requirement}
                    className="w-full p-4 rounded-lg border outline-border"
                  >
                    <option disabled defaultChecked>Selecciona un requerimiento</option>
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

            <button
              type="button"
              onClick={agregarRequerimiento}
              className="block w-full p-2 rounded-lg border outline-border bg-blue-200"
            >
              Agregar Requerimiento
            </button>

            <input
              placeholder="Documentos"
              onChange={onChange}
              name="documents"
              value={grant.documents}
              className="block w-full p-2 rounded-lg border outline-border"
            />

            <input
              placeholder="Monto"
              type="number"
              onChange={onChange}
              name="amount"
              value={grant.amount}
              className="block w-full p-2 rounded-lg border outline-border"
            />

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
