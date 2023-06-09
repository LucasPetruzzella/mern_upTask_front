import { useEffect } from "react";
import { useParams } from "react-router-dom";

import FormularioColaborador from "../components/FormularioColaborador";
import useProyectos from "../hooks/useProyectos";

const NuevoColaborador = () => {
  const { obtenerProyecto, proyecto,cargandoColaborador, colaborador,agregarColaborador } = useProyectos();
  const params = useParams()

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  const nuevoColaborador = async(id) => {
    await agregarColaborador(id)
  }

  return (
    <>
      <h1 className="text-4xl font-black">Añadir Colaborador al proyecto {proyecto.nombre}</h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>

      {
        cargandoColaborador ? (
            <p className="text-center">Cargando...</p>
        ) : colaborador?._id? (
            <div className="flex justify-center mt-10">
                <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
                    <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>

                    <div className="flex justify-between items-center">
                        <p>{colaborador.nombre}</p>

                        <button 
                        onClick={() => { nuevoColaborador(colaborador._id) }}
                        className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm">Agregar al Proyecto</button>
                    </div>
                </div>
            </div>
            
        ) : ""
      }
    </>
  );
};

export default NuevoColaborador;
