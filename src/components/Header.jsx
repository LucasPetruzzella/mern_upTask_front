import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Busqueda from "./Busqueda";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { handleBuscador, cerrarSessionProyectos } = useProyectos()
  const { cerrarSessionAuth } = useAuth()
  const navigate = useNavigate()

  const cerrarSession = () => {
    cerrarSessionProyectos()
    cerrarSessionAuth()
    localStorage.removeItem("Token")

    navigate("/")
  }
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <Link to="/proyectos" className="font-bold uppercase">
          <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
            UpTask
          </h2>
        </Link>

        <div className="flex items-center gap-4">
          <button
          type="button"
          onClick={handleBuscador}
          className="font-bold uppercase"
          >Buscar Proyectos</button>
          <Link to="/proyectos" className="font-bold uppercase">
            Proyectos
          </Link>

          <button
            type="button"
            onClick={cerrarSession}
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
          >
            Cerrar Sesión
          </button>

          <Busqueda />
        </div>
      </div>
    </header>
  );
};

export default Header;
