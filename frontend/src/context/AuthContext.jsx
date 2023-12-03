import { createContext, useContext, useEffect } from 'react';
import { useRouter } from "next/router";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({children}){
    const router = useRouter();
    const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) || "" : "";
    const isAuthenticated = user ? true : false;

    useEffect(() => {
      // redirect to home if not authenticated y solo acceso a register
        const allowedRoutes = ['/register', '/', '/login'];
        if (!isAuthenticated && !allowedRoutes.includes(router.pathname)) {
          router.push("/");
        }
        if (isAuthenticated && allowedRoutes.includes(router.pathname)) {
          router.push("/dashboard");
        }

      }, [isAuthenticated, router]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}