import React from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext';

const dashboardUser = () => {
    const router = useRouter();

    const { user: currentUser } = useAuth();
    

    console.log(currentUser);


    // Funcion para ir a la pagina de postulaciones
    const postularBecas = () => {
        router.push("/applications/create")
    };

    // Funcion para ir a la pagina de becas
    const verBecas = () => {
        router.push("/grant")
    };

    const revisarSolicitud = () => {
        router.push(`/applications/${currentUser.id}`)
    };

  return (
    <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Carta de Becas */}
            <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={verBecas}>
            <h3 className="text-lg font-semibold mb-4">Becas</h3>
            <p className="text-gray-600">
                Explora la lista de becas para postular.
            </p>
        </div>

            {/* Carta de Postulaciones */}
            <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={postularBecas}>
                <h3 className="text-lg font-semibold mb-4">Postulaciones</h3>
                <p className="text-gray-600">Realiza aqui tu postulacion a beca.</p>
            </div>

            {/* Carta de Historial */}
            <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={revisarSolicitud}>
                <h3 className="text-lg font-semibold mb-4">Revisa tus solicitudes</h3>
                <p className="text-gray-600">Puedes ver el estado de tu solicitud</p>
            </div>
        </div>
  </div>
  )
}

export default dashboardUser