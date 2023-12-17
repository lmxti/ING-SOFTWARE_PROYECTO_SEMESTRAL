import React, { useState, useEffect } from 'react';
import { getPersonById } from '@/services/person.service';
import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar';

const Usuario = () => {
  const router = useRouter();
  const { usuario: id } = router.query;

  const [dataUser, setDataUser] = useState([]);

  const setData = async () => {
    try {
      if (id) {
        const response = await getPersonById(id);
        setDataUser(response.data.data);
        console.log("Estos son los datos del usuario: ", response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setData();
  }, [id]); // Asegúrate de ejecutar setData cuando el ID cambie

  const handleEditClick = () => {
    // Lógica para abrir la ventana de edición
    console.log("Abriendo ventana de edición...");
  };

  const formatDate = (dateString) => {
    const fechaObj = new Date(dateString);
    const dia = fechaObj.getDate().toString().padStart(2, '0');
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaObj.getFullYear();
    return `${dia}-${mes}-${anio}`;
  };

  return (
    <>
      <NavBar />
      <div className='max-w-2xl mx-auto mt-8 p-4 bg-blue-100 rounded shadow-xl'>
        <div className='flex flex-col items-center justify-center mb-4'>
            <img
                src="/images/iconos/icono-persona.png"  // Asegúrate de que la ruta sea correcta
                alt="Silueta de Persona"
                className='w-20 h-20  object-cover bg-white rounded-full p-2'
            />
        </div>
        <h2 className='text-2xl font-semibold mb-4'>Información del Usuario</h2>
        <div>
            <p className='mb-2'>
                <span className='font-semibold'>Nombre:</span> {dataUser.name}
            </p>

          <p className='mb-2'>
            <span className='font-semibold'>Apellido:</span> {dataUser.surname}
          </p>
          <p className='mb-2'>
            <span className='font-semibold'>Email:</span> {dataUser.email}
          </p>
          <p className='mb-2'>
            <span className='font-semibold'>Teléfono:</span> {dataUser.phone}
          </p>
          <p className='mb-2'>
            <span className='font-semibold'>Fecha de Nacimiento:</span>  {formatDate(dataUser.birthdate)}
          </p>
        </div>
        <button
          className='bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600'
          onClick={handleEditClick}
        >
          Editar Información
        </button>
      </div>
    </>
  );
};

export default Usuario;
