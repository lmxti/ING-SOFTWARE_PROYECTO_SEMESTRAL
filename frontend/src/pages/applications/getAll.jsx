import React, { useState, useEffect } from 'react';
import { getApplications, updateApplication } from '@/services/application.service';
import NavBar from '@/components/NavBar';
import Mensajes from '@/components/mensajes';

const getAllApplications = () => {

  const [applications, setApplications] = useState([]);

  const setApplication = async () => {
    try {
      const response = await getApplications();
      setApplications(response.data.data);
      Mensajes.mensajeExito('Se cargaron las postulaciones correctamente');
    } catch (error) {
      Mensajes.mensajeError(error.response.data.data);
    }
  };

  const updateStatus = async (applicationId, newStatus) => {
    try {
      // Actualizar el estado en el backend
      const formData = { status: newStatus };
      await updateApplication(applicationId, formData);
      Mensajes.mensajeExito('Se actualizó el estado correctamente');
      setApplication();
    } catch (error) {
      Mensajes.mensajeError(error.response.data.data);
    }
  };

  const [stateFilter, setStateFilter] = useState();

  useEffect(() => {
    setApplication();
  }, []);

  const filteredApplications = stateFilter ? applications.filter((application) => application.status === stateFilter) : applications;

  const showApplications = () => (
    <div className="overflow-x-auto">
        <label>Filtrar por Estado:</label>
        <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}>
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Aceptado">Aceptado</option>
            <option value="Rechazado">Rechazado</option>
            </select>
      <table>
        <thead>
          <tr>
            <th className="border border-blue-300 px-4 py-2">Postulante</th>
            <th className="border border-blue-300 px-4 py-2">Beca</th>
            <th className="border border-blue-300 px-4 py-2">Monto</th>
            <th className="border border-blue-300 px-4 py-2">Estado</th>
            <th className="border border-blue-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((application, i) => (
            <tr key={i}>
              <td className="border border-blue-300 px-4 py-2 text-center">
                {application.person.name} {application.person.surname}
              </td>
              <td className="border border-blue-300 px-4 py-2 text-center">{application.grant.name}</td>
              <td className="border border-blue-300 px-4 py-2 text-center">{application.grant.amount}</td>
              <td className="border border-blue-300 px-4 py-2 text-center">{application.status}</td>
              <td className="border border-blue-300 px-4 py-2 text-center">Actualizar estado
                <select
                  className="border border-blue-300 px-4 py-2 text-center"
                  value={application.newStatus || ''}
                  onChange={(e) => {
                    const updatedApplications = [...applications];
                    updatedApplications[i].newStatus = e.target.value;
                    setApplications(updatedApplications);
                  }}
                >
                  <option value="">Seleccione</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Aceptado">Aceptado</option>
                  <option value="Rechazado">Rechazado</option>
                </select>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                  onClick={() => updateStatus(application._id, application.newStatus)}
                >
                  Actualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="container mx-auto my-4">
        {showApplications()}
      </div>
    </>
  );
};

export default getAllApplications;
