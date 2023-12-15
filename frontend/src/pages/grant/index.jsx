// <-----------------  BIBLIOTECAS ----------------->
import { useState, useEffect } from 'react';
// <----------------- COMPONENTES --------------->
import NavBar from '@/components/NavBar';
// <--------------- SERVICIOS ---------------->
import { getGrants, desactivateGrantByID, activateGrantByID } from '@/services/grant.service';
// <----------------- ICONOS ----------------->
import { IoEye, IoEyeOff } from 'react-icons/io5';

const Grant = () => {
  const [becas, setBecas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState(null);

  const setGrant = async () => {
    try {
      const response = await getGrants();
      setBecas(response.data.data.data);
      console.log(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const desactivateGrant = async (id) => {
    try {
      const response = await desactivateGrantByID(id);
      console.log(response);
      setGrant();
      alert('Beca desactivada');
    } catch (error) {
      console.log(error);
    }
  };

  const activateGrant = async (id) => {
    try {
      const response = await activateGrantByID(id);
      console.log(response);
      setGrant();
      alert('Beca activada');
    } catch (error) {
      console.log(error);
    }
  };



  const formatDate = (dateString) => {
    const fechaObj = new Date(dateString);
    const dia = fechaObj.getDate().toString().padStart(2, '0');
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaObj.getFullYear();

    return `${dia}-${mes}-${anio}`;
  };
  

  useEffect(() => {
    setGrant();
  }, []);

  const showGrants = () => {
    // Filtrar becas basándonos en el término de búsqueda y el estado
    const filteredGrants = becas.filter(beca =>
      (searchTerm === '' || beca.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (stateFilter === null || beca.state === (stateFilter === 'true' || stateFilter === true || stateFilter === 'Activo'))
    );

    return (
      <div className="overflow-x-auto">

        <div className="mb-4 flex justify-center items-center space-x-4">
          <label className="block text-sm font-medium text-gray-700">
            Filtrar por Nombre
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Nombre de beca"
          />

          <label className="block text-sm font-medium text-gray-700">
            Filtrar por estado:
          </label>
          <select
            value={stateFilter === null ? '' : stateFilter}
            onChange={(e) => setStateFilter(e.target.value === '' ? null : e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Cualquiera</option>
            <option value="true">Activas</option>
            <option value="false">Inactiva</option>
          </select>
        </div>

        <table className="min-w-full bg-blue-50 border border-gray-300">
          <thead>
            <tr className='bg-blue-950 text-blue-300'>
              <th className="border border-blue-300 px-4 py-2">Nombre</th>
              <th className="border border-blue-300 px-4 py-2">Requisitos</th>
              <th className="border border-blue-300 px-4 py-2">Documentos</th>
              <th className="border border-blue-300 px-4 py-2">Monto</th>
              <th className="border border-blue-300 px-4 py-2 w-1/6">Fecha de Creación</th>
              <th className='border border-blue-300 px-4 py-2'>Estado</th>
              <th className="border border-blue-300 ">Accion</th>
            </tr>
          </thead>
          <tbody>
            {filteredGrants.map((beca, i) => (
              <tr key={i}>

                  <td className="border border-blue-300 px-4 py-2 text-center">
                    {beca.name}
                  </td>

                  <td className="border border-blue-300 px-4 py-2 font-thin">
                    {beca.requirements.map((requirement, j) => (
                      <li key={j}>{requirement.name}</li>
                    ))}
                  </td>

                  <td className="border border-blue-300 px-4 py-2 font-thin">
                    {beca.documents.map((document, j) => (
                      <li key={j}>{document}</li>
                    ))}
                  </td>

                  <td className="border border-blue-300 px-4 py-2 font-thin">
                    ${beca.amount}
                  </td>

                  <td className="border border-blue-300 px-4 py-2 font-thin">
                    {formatDate(beca.createdAt)}
                  </td>

                  <td className="border border-blue-300 px-4 py-2 font-thin"> 
                    {beca.state === true ? 'Activa' : beca.state === false ? 'Inactiva' : 'Estado Desconocido'}
                  </td>

                  <td className="border border-blue-300 px-4 py-2 font-thin">
                    <div className='flex justify-center items-center'>
                      <button className='p-4 hover:text-blue-500'>
                        { beca.state === true
                            ? (<IoEyeOff title='Desactivar'onClick={ () => desactivateGrant(beca._id)}/>)
                            : <IoEye title='Activar' onClick={ () => activateGrant(beca._id) }/>
                          }
                      </button>
                    </div>
                  </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto my-4">
        {showGrants()}
      </div>
    </>
  );
};

export default Grant;
