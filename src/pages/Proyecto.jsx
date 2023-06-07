import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import { Link } from "react-router-dom";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import Tarea from "../components/Tarea";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import useAdmin from "../hooks/useAdmin";
import io from "socket.io-client"

let socket;

const Proyecto = () => {
  const params = useParams();
  const {
    obtenerProyecto,
    proyecto,
    modalFormTarea,
    setModalFormTarea,
    submitTareasProyecto,
  } = useProyectos();

  const admin = useAdmin();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_SOCKET_SERVER)

    socket.emit('abrir-proyecto',params.id)
  }, []);

  useEffect(() => {
    socket.on('nueva-tarea',(tareaNueva) => {
      if(tareaNueva.proyecto === proyecto._id){
        submitTareasProyecto(tareaNueva)
      }
     
    })
  });

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{proyecto?.nombre}</h1>

        {admin && (
          <>
            <div className="flex items-center gap-2 text-gray-400 hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              <Link
                to={`/proyectos/editar/${params.id}`}
                className="uppercase font-bold"
              >
                Editar
              </Link>
            </div>
          </>
        )}
      </div>

      {admin && (
        <button
          type="button"
          onClick={() => {
            setModalFormTarea(true);
          }}
          className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold mt-5 bg-sky-400 text-white text-center flex gap-2 items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Nueva Tarea
        </button>
      )}

      <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyecto.tareas?.length ? (
          proyecto.tareas.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        ) : (
          <p className="text-center my-5 `-10">
            No hay tareas en este proyecto
          </p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-xl mt-10">Colaboradores</p>

            <Link
              className="text-gray-400 uppercase font-bold hover:text-black"
              to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
            >
              Añadir
            </Link>
          </div>

          <div className="bg-white shadow mt-10 rounded-lg">
            {proyecto.colaboradores?.length ? (
              proyecto.colaboradores.map((colaborador) => (
                <Colaborador key={colaborador._id} colaborador={colaborador} />
              ))
            ) : (
              <p className="text-center my-5 `-10">
                No hay colaboradores en este proyecto
              </p>
            )}
          </div>

          <ModalFormularioTarea
            modal={modalFormTarea}
            setModal={setModalFormTarea}
          />
        </>
      )}
    </>
  );
};

export default Proyecto;
