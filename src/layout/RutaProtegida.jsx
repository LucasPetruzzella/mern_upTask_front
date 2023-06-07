import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

const RutaProtegida = () => {
  const { auth, cargandoAuth } = useAuth();

  if (cargandoAuth) {
    return "Cargando..";
  }

  return (<>
  
  {auth.id ? (
  
  <div className="bg-gray-100">
    <Header />
    <div className="md:flex md:min-h-screen">
        <SideBar />

        <main className="flex-1 p-10">
            <Outlet />
        </main>
    </div>
   
  </div>
 
  ) : cargandoAuth ? "Cargando..." : <Navigate to="/"></Navigate>}
  </>);
};

export default RutaProtegida;
