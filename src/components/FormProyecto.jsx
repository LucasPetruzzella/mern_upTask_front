import { useState, useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";
import { useParams } from "react-router-dom";

const FormProyecto = () => {
  const [id, setId] = useState(null)
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaEntrega, setFechaEntrega] = useState('')
  const [cliente, setCliente] = useState('')
  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()
  const params = useParams()
  
  useEffect(() => {
    if(params.id && proyecto?.nombre){
      setId(proyecto._id)
      setNombre(proyecto.nombre)
      setDescripcion(proyecto.descripcion)
      setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
      setCliente(proyecto.cliente)
    }
  },[params])

    const handleSubmit = async e => {
        e.preventDefault()

        if([nombre,descripcion,fechaEntrega,cliente].includes('')){
            mostrarAlerta({
                error: true,
                msg: "Todos los campos son obligatorios"
            })
            return
        }

        await submitProyecto({
            id,
            nombre,
            descripcion,
            fechaEntrega,
            cliente
        })

        setId('')
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
    }

  return (
    <form onSubmit={handleSubmit} className="bg-white py-10 px-5 md:w-1/2 rounded-lg">
        { alerta.msg && <Alerta alerta={alerta} />}


      <div>
        <label
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre proyecto
        </label>
        <input
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="nombre"
          placeholder="Nombre del proyecto"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        ></input>
      </div>

      <div className="mb-5">
        <label
          htmlFor="descripcion"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Descripcion proyecto
        </label>
        <textarea
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="descripcion"
          placeholder="Descripcion del proyecto"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-5">
        <label
          htmlFor="fechaEntrega"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Fecha Inicio
        </label>
        <input
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="fechaEntrega"
          placeholder="Fecha de entrega"
          value={fechaEntrega}
          onChange={e => setFechaEntrega(e.target.value)}
        ></input>
      </div>

      <div className="mb-5">
        <label
          htmlFor="cliente"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre Cliente
        </label>
        <input
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="cliente"
          placeholder="Nombre del proyecto"
          value={cliente}
          onChange={e => setCliente(e.target.value)}
        ></input>
      </div>

      <input
        type="submit"
        
        value={ id ? 'Editar Proyecto' : 'Crear Proyecto' }
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"></input>
    </form>
  );
};

export default FormProyecto;
