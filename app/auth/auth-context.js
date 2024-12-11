"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../axios/axiosConfig'; // Use your Axios instance
import { toast } from 'sonner';
// Create a Context with default values
const AuthContext = createContext();

// Create a provider component
 function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        const getWelcome=async()=>{
            await api.get("https://bgstudiobackend-1.onrender.com")
            .then((data)=>{
                console.log(data)
            }).catch((err)=>{
                console.log(err)
            })
        }     
        
        getWelcome
    },[])
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    // Set the Authorization header with the token
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    // Validate token with a protected route
                    const response = await api.get('https://bgstudiobackend-1.onrender.com/api/protected-route');
                    if (response.status === 200) {
                        setIsAuthenticated(true);
                        console.log("Access granted")
                        // Fetch hospital data if token is valid
                        
                        // const hospitalResponse = await api.get(`https://bgstudiobackend-1.onrender.com/api/hospital/${response?.data?.hospitalId}`);
                        // setHospitalData(hospitalResponse.data);
                        // localStorage.setItem("_id",hospitalResponse?.data._id)
                    } else {
                        // Token is not valid, redirect to login
                        setIsAuthenticated(false);
                        if (router.pathname !== '/') {
                            router.push('/');
                        }
                    }
                } catch (error) {
                    // Token verification failed, redirect to login
                    console.error('Token verification failed:', error);
                    setIsAuthenticated(false);
                    if (router.pathname !== '/') {
                        router.push('/');
                    }
                }
            } else {
                // No token found, redirect to login
                setIsAuthenticated(false);
                if (router.pathname !== '/') {
                    router.push('/');
                }
            }
        };
        checkAuth();
    }, [router]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, }}>
            {children}
        </AuthContext.Provider>
    );
}

// Create a custom hook for easier context usage
export function useAuth() {
    return useContext(AuthContext);
}

export {AuthContext,AuthProvider}