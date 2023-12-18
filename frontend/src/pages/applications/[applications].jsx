import React, { useState, useEffect } from 'react';
import { getApplicationPerson } from '@/services/application.service';

import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar';


const Applications = () => {

    const router = useRouter();
    const { applications: id } = router.query;

    console.log("Este es el id del usuario actual: ", id);

    const [applications, setApplications] = useState([]);

    const setApplication = async () => {
        try {
          const response = await getApplicationPerson(id);
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        setApplication();
      }, []);

  return (
    <>
        <NavBar/>
    </>
  )
}

export default Applications