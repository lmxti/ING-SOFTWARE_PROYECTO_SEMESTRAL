// <-----------------  BIBLIOTECAS ----------------->
import { useState, useEffect } from 'react';
// <----------------- COMPONENTES --------------->
import NavBar from '@/components/NavBar';
// <--------------- SERVICIOS ---------------->
import { getPersonsWithGrants } from '@/services/person.service'

const Assigned = () => {
    const [personsWithGrant, setPersonsWithGrant] = useState([]);

    const setPersons = async () => {
        try {
            const response = await getPersonsWithGrants();
            setPersonsWithGrant(response.data.data);
            console.log("Estas son las personas con becas: ", response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setPersons();
    }, []);

    const showPersonsGrants = () => {
        if (personsWithGrant.length === 0) {
            return (
                <div className="container mx-auto my-10 text-center">
                    <p className="text-xl font-bold">No hay personas con becas en estos momentos.</p>
                </div>
            );
        }

        return (
            <div className="container mx-auto my-10">
                <p className="text-3xl font-bold mb-5 text-center uppercase">Becas asignadas</p>
                <p className="text-xl font-bold mb-5 text-center">Listado de personas que cuentan con una beca aprobada y asignada</p>
                <table className="min-w-full bg-blue-50 border border-gray-300">
                    <thead>
                        <tr className='bg-blue-950 text-blue-300'>
                            <th className="border border-blue-300 px-4 py-2">RUT</th>
                            <th className="border border-blue-300 px-4 py-2">Nombre</th>
                            <th className="border border-blue-300 px-4 py-2">Apellido</th>
                            <th className="border border-blue-300 px-4 py-2">Beca</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personsWithGrant.map((data, index) => (
                            <tr key={index}>
                                <td className="border border-blue-300 px-4 py-2 text-center">{data.person.rut}</td>
                                <td className="border border-blue-300 px-4 py-2 text-center">{data.person.name}</td>
                                <td className="border border-blue-300 px-4 py-2 text-center">{data.person.surname}</td>
                                <td className="border border-blue-300 px-4 py-2 text-center">{data.grant.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <>
            <NavBar />
            {/* Mostrar personas personsWithGrant */}
            {showPersonsGrants()}
        </>
    )
}

export default Assigned;
