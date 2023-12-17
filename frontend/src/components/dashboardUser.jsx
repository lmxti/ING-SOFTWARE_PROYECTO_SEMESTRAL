import React from 'react'
import { useRouter } from 'next/router'

const dashboardUser = () => {
    const router = useRouter();

    // Funcion para ir a la pagina de postulaciones
    const postularBecas = () => {
        router.push("/applications/create")
    };

    // Funcion para ir a la pagina de becas
    const verBecas = () => {
        router.push("/grant")
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
            <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer">
                <h3 className="text-lg font-semibold mb-4">Historial</h3>
                <p className="text-gray-600">Tu historial y actividades anteriores.</p>
            </div>
        </div>
  </div>
  )
}

export default dashboardUser