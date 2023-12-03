import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import DashboardUser from '@/components/DashboardUser';
import DashboardAdmin from '@/components/DashboardAdmin';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <NavBar />
        { user.role.name === 'admin' ? <DashboardAdmin /> : <DashboardUser /> }
    </>
  );
};

export default Dashboard;
