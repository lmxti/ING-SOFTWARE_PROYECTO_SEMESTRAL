import { useState, useEffect } from 'react';
import { getGrants } from '@/services/grant.service';
import NavBar from '@/components/NavBar';

const Grant = () => {
  const [becas, setBecas] = useState([]);

  const setGrant = async () => {
    try {
      const response = await getGrants();
      setBecas(response.data.data.data);
      console.log(response.data.data.data);
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
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-blue-50 border border-gray-300">
          <thead>
            <tr className='bg-blue-950 text-blue-300'>
              <th className="border border-blue-300 px-4 py-2">Nombre</th>
              <th className="border border-blue-300 px-4 py-2">Requisitos</th>
              <th className="border border-blue-300 px-4 py-2">Documentos</th>
              <th className="border border-blue-300 px-4 py-2">Monto</th>
              <th className="border border-blue-300 px-4 py-2 w-1/6">Fecha de Creación</th>
            </tr>
          </thead>
          <tbody>
            {becas.map((beca, i) => (
              <tr key={i}>
                <td className="border border-blue-300 px-4 py-2 text-center">{beca.name}</td>
                <td className="border border-blue-300 px-4 py-2 font-thin">
                  {beca.requirements.map((requirement, j) => (
                    <span key={j}>{requirement.name}</span>
                  ))}
                </td>
                <td className="border border-blue-300 px-4 py-2 font-thin">
                  {beca.documents.map((document, j) => (
                    <li key={j}>{document}</li>
                  ))}
                </td>
                <td className="border border-blue-300 px-4 py-2 font-thin">${beca.amount}</td>
                <td className="border border-blue-300 px-4 py-2 font-thin">{formatDate(beca.createdAt)}</td>
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
