import { useState, createContext, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth,setAuth] = useState({})
    const [cargandoAuth,setCargadoAuth] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('Token')

            if(!token){
                setCargadoAuth(false)
                return
            }
    
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try{
                const {data} = await clienteAxios.get(`/usuarios/perfil`,config);
               
                setAuth({
                    nombre: data.nombre,
                    email: data.email,
                    id: data._id
                })
            }catch(error){
                navigate("/")
            }

            setCargadoAuth(false)
        }

        autenticarUsuario()
        
    },[])

    const cerrarSessionAuth = () =>{
        setAuth({})
    }


  return (<AuthContext.Provider value={{
    cargandoAuth,
    auth,
    setAuth,
    cerrarSessionAuth
  }}>
    {children}
    </AuthContext.Provider>);
};

export { AuthProvider };

export default AuthContext;
