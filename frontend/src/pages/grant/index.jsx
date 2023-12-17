// <-----------------  BIBLIOTECAS ----------------->
import { useState, useEffect } from 'react';
// <----------------- COMPONENTES --------------->
import NavBar from '@/components/NavBar';
import Mensajes from '@/components/mensajes';
// <--------------- SERVICIOS ---------------->
import { useAuth } from '../../context/AuthContext';
import { getGrants, desactivateGrantByID, activateGrantByID } from '@/services/grant.service';
// <----------------- ICONOS ----------------->
import { IoEye, IoEyeOff } from 'react-icons/io5';

const Grant = () => {
  
  // Listado de becas por defecto vacio
  const [becas, setBecas] = useState([]);

  const { user } = useAuth();
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (user && user.role) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    console.log("Cargando...", user.role ? user.role.name : "Role no definido");
  }
  
  


  // <------------------------------------ BECAS ------------------------------------>
  // Funcion que obtiene las becas de BD en el listado de becas
  const setGrant = async () => {
    try {
      const response = await getGrants();
      setBecas(response.data.data.data);
      console.log("Estas son las becas de setGrant: ",response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Al renderizar la página se obtienen las becas
  useEffect(() => {
    setGrant();
  }, []);

  // <-------- FUNCION PARA DESACTIVAR UNA BECA -------->
  const desactivateGrant = async (id, nombreBeca) => {
    try {
      const response = await desactivateGrantByID(id);
      setGrant();
      Mensajes.mensajeExito(`Has desactivado la beca ${nombreBeca}, ya no estará disponible para la comunidad. `);
    } catch (error) {
      console.log(error);
      Mensajes.mensajeError('Ocurrió un error inesperado al desactivar beca, intenta nuevamente.');
    }
  };
  // <-------- FUNCION PARA ACTIVAR UNA BECA -------->
  const activateGrant = async (id, nombreBeca) => {
    try {
      const response = await activateGrantByID(id);
      setGrant();
      Mensajes.mensajeExito(`Has activado la beca ${nombreBeca}, ya estará disponible para la comunidad.`);
    } catch (error) {
      console.log(error);
      Mensajes.mensajeError('Ocurrió un error inesperado al activar beca, intenta nuevamente.');
    }
  };

  // <-------- PERSONALIZACION DE TABLA DE BECAS -------->

  // Función que formatea la fecha de creación de la beca
  const formatDate = (dateString) => {
    const fechaObj = new Date(dateString);
    const dia = fechaObj.getDate().toString().padStart(2, '0');
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaObj.getFullYear();
    return `${dia}-${mes}-${anio}`;
  };
  
  // Filtros de búsqueda en la tabla de becas
  // Filtro de nombre de beca
  const [searchTerm, setSearchTerm] = useState('');
  // Filtro de estado de beca
  const [stateFilter, setStateFilter] = useState(null);


  // Función que muestra la tabla de becas
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

          {user && user.role.name === 'admin' && (
              <div className='flex justify-center items-center'>
                <button className=' bg-blue-900 hover:bg-blue-500 hover:text-blue-100 text-blue-300 border border-blue-300 p-2 rounded-xl'>
                  <a href='/grant/create'>Crear nueva beca</a>
                </button>
              </div>
            )}
        </div>

        <table className="min-w-full bg-blue-50 border border-gray-300">
          <thead>
            <tr className='bg-blue-950 text-blue-300'>
              <th className="border border-blue-300 px-4 py-2">Nombre</th>
              <th className="border border-blue-300 px-4 py-2">Requisitos</th>
              <th className="border border-blue-300 px-4 py-2">Documentos</th>
              <th className="border border-blue-300 px-4 py-2">Monto</th>
              <th className="border border-blue-300 px-4 py-2 w-1/6">Ult. activacion</th>
              <th className='border border-blue-300 px-4 py-2'>Estado</th>
              {user && user.role.name === 'admin' && (
                <>
                  <th className="border border-blue-300 px-4 py-2">Acciones</th>
                </>
              )}
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
                    {formatDate(beca.activationDate)}
                  </td>

                  <td className="border border-blue-300 px-4 py-2 font-thin"> 
                    {beca.state === true ? 'Activa' : beca.state === false ? 'Desactivada' : 'Estado Desconocido'}
                  </td>

               {/* Mostrar acciones específicas para administradores */}
                {user && user.role.name === 'admin' && (
                  <td className="border border-blue-300 px-4 py-2 font-thin">
                    <div className='flex justify-center items-center'>
                      <button className='p-4 hover:text-blue-500 bg-slate-200 hover:bg-black rounded-md'>
                        { beca.state === true
                            ? (<IoEyeOff title='Desactivar' onClick={() => desactivateGrant(beca._id, beca.name)}/>)
                            : <IoEye title='Activar' onClick={() => activateGrant(beca._id, beca.name)}/>
                          }
                      </button>
                    </div>
                  </td>
                )}

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
