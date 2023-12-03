import {useState} from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';


const ShowUser = () => {

  const router = useRouter();

  const { user: currentUser } = useAuth();
  
  // const emailLetter = currentUser.email[0]?.toUpperCase();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <div className="relative inline-block">
      <img
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
        className="cursor-pointer rounded-full h-12 w-12"
        onClick={toggleMenu}
      />

      {/* <div className='cursor-pointer rounded-full h-12 w-12 bg-white flex justify-center items-center' onClick={toggleMenu}>
          {emailLetter}
      </div> */}

      {isMenuOpen && (
        <ul className="absolute flex flex-col gap-2 right-0 w-80 rounded-md border border-blue-gray-50 bg-white px-3 py-2  text-sm  shadow-lg ">

           <button onClick={() => router.push('/dashboard')} tabIndex="-1" className="w-full flex items-center justify-center py-2 px-3 rounded-md text-sm  text-gray-600 hover:bg-blue-50">
            <p>Inicio</p>
          </button>

          {/*
          <button tabIndex="-1" role="menuitem" className="w-full flex items-center justify-center py-2 px-3 rounded-md text-sm  text-gray-600 hover:bg-blue-50">
            <p>Perfil</p>
          </button> */}

          <button onClick={handleLogout} tabIndex="-1" className="w-full flex items-center justify-center py-2 px-3 rounded-md text-sm  text-gray-600 hover:bg-blue-50">
            <p>Cerrar sesión</p>
          </button>

          

        </ul>
      )}
    </div>
  )
}

export default ShowUser