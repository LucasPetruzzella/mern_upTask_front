import useProyectos from "../hooks/useProyectos";

const Colaborador = ({ colaborador }) => {
  const { nombre, email } = colaborador;
  const { eliminarColaborador } = useProyectos()

  const handleEliminar = (colaborador) => {
    const respuesta = confirm("¿Confirma Eliminar Colaborador?")

    if(respuesta){
        eliminarColaborador(colaborador)
    }
  }
  return (
    <div className="border-b flex p-5 justify-between items-center">
      <div>
        <p>{colaborador.nombre}</p>
        <p className="text-sm text-gray-700">{colaborador.email}</p>
      </div>

      <div>
        <button
        type="button"
        onClick={() => {handleEliminar(colaborador)}}
        className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">Eliminar</button>
      </div>
    </div>
  );
};

export default Colaborador;
