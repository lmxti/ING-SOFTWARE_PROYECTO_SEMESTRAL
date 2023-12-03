import React from 'react'

const dashboardUser = () => {
  return (
    <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Carta de Perfil */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Perfil</h3>
                <p className="text-gray-600">Tu perfil y datos personales.</p>
            </div>

            {/* Carta de Becas */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Becas</h3>
                <p className="text-gray-600">Becas disponibles para postular.</p>
            </div>

            {/* Carta de Postulaciones */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Postulaciones</h3>
                <p className="text-gray-600">Estado de tus postulaciones.</p>
            </div>

            {/* Carta de Historial */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Historial</h3>
                <p className="text-gray-600">Tu historial y actividades anteriores.</p>
            </div>
            
        </div>
  </div>
  )
}

export default dashboardUser