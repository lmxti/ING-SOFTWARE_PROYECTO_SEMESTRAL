import React from 'react'
import { useRouter } from 'next/router';

const dashboardAdmin = () => {
    const router = useRouter();

    // Funcion para ir a la pagina de crear beca
    const crearBeca = () => {
        router.push("/grant/create")

    }
    // Funcion para ir a la pagina de becas(listado)
    const verBecas = () => {
        router.push("/grant")

    }

  return (
    <div className="container mx-auto mt-8 ">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  ">

        {/* Carta de crear beca */}
        <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={crearBeca}>
            <h3 className="text-lg font-semibold mb-4">Publicar beca</h3>
            <p className="text-gray-600">Crea y publica una beca</p>
        </div>

        {/* Carta de Becas */}
        <div className="bg-white p-4 rounded-lg shadow-md" onClick={verBecas}>
            <h3 className="text-lg font-semibold mb-4">Becas</h3>
            <p className="text-gray-600">
                Explora la lista de becas, desde aqui puedes habilitar y deshabilitar becas
            </p>
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

export default dashboardAdmin