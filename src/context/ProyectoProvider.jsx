import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth";

let socket;
const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [alerta, setAlerta] = useState({});
  const [modalFormTarea, setModalFormTarea] = useState(false);
  const [tarea, setTarea] = useState({});
  const [colaborador, setColaborador] = useState();
  const [cargandoColaborador, setCargandoColaborador] = useState(false);
  const [buscador, setBuscador] = useState(false);
  const { auth } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    socket = io(import.meta.env.VITE_SOCKET_SERVER);
  }, []);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  useEffect(() => {
    const obtenerProyectos = async () => {
      const token = localStorage.getItem("Token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios(`/proyectos`, config);
        setProyectos(data);
      } catch (error) {
        mostrarAlerta({
          error: true,
          msg: error.response.data.msg || error.response.statusText,
        });
      }
    };

    obtenerProyectos();
  }, [auth]);

  const submitProyecto = async (proyecto) => {
    const token = localStorage.getItem("Token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (proyecto.id) {
        await editarProyecto(proyecto, config);
      } else {
        await crearProyecto(proyecto, config);
      }
    } catch (error) {
      mostrarAlerta({
        error: true,
        msg: error.response.data.msg || error.response.statusText,
      });
    }
  };

  const editarProyecto = async (proyecto, config) => {
    const { data } = await clienteAxios.put(
      `/proyectos/${proyecto.id}`,
      proyecto,
      config
    );

    mostrarAlerta({
      error: false,
      msg: "Proyecto Editado Correctamente",
    });

    const proyectosUpdate = proyectos.map((p) =>
      p._id === proyecto.id ? data : p
    );
    setProyectos(proyectosUpdate);

    setTimeout(() => {
      mostrarAlerta({});
      navigate("/proyectos");
    }, 3000);
  };

  const eliminarProyecto = async (id) => {
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);

    mostrarAlerta({
      error: false,
      msg: "Proyecto Eliminado Correctamente",
    });

    const proyectosUpdate = proyectos.filter((p) => p._id !== id);
    setProyectos(proyectosUpdate);

    setTimeout(() => {
      mostrarAlerta({});
      navigate("/proyectos");
    }, 3000);
  };

  const crearProyecto = async (proyecto, config) => {
    const { data } = await clienteAxios.post(`/proyectos`, proyecto, config);

    mostrarAlerta({
      error: false,
      msg: "Proyecto Creado Correctamente",
    });

    setProyectos([...proyectos, data]);

    setTimeout(() => {
      mostrarAlerta({});
      navigate("/proyectos");
    }, 3000);
  };

  const obtenerProyecto = async (id) => {
    const token = localStorage.getItem("Token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios(`/proyectos/${id}`, config);

      setProyecto(data);
    } catch (error) {
      navigate("/proyectos");
    }
  };

  const submitTarea = async (tarea) => {
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (tarea.id) {
      await editarTarea(tarea, config);
    } else {
      await crearTarea(tarea, config);
    }
    setTimeout(() => {
      mostrarAlerta({});
      navigate(`/proyectos/${tarea.proyecto}`);
    }, 3000);
  };

  const handleModalEditarTarea = (tarea) => {
    setTarea(tarea);
    setModalFormTarea(true);
  };

  const crearTarea = async (tarea, config) => {
    const { data } = await clienteAxios.post(`/tareas`, tarea, config);

    setAlerta({
      error: false,
      msg: "Tarea creada Correctamente",
    });

    socket.emit("nueva-tarea", data);
  };

  const editarTarea = async (tarea, config) => {
    const { data } = await clienteAxios.put(
      `/tareas/${tarea.id}`,
      tarea,
      config
    );

    mostrarAlerta({
      error: false,
      msg: "Tarea Editada Correctamente",
    });

    const proyectoActualizado = {
      ...proyecto,
    };

    proyectoActualizado.tareas = proyecto.tareas.map((t) =>
      t._id === tarea.id ? data : t
    );

    setProyecto(proyectoActualizado);
  };

  const eliminarTarea = async (tarea) => {
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config);

    mostrarAlerta({
      error: false,
      msg: data.msg,
    });

    const proyectoActualizado = {
      ...proyecto,
    };

    proyectoActualizado.tareas = proyecto.tareas.filter(
      (t) => t._id !== tarea._id
    );

    setProyecto(proyectoActualizado);
  };

  const submitColaborador = async (email) => {
    setCargandoColaborador(true);
    const token = localStorage.getItem("Token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios(`/usuarios/${email}`, config);

      setColaborador(data);
    } catch (error) {
      setColaborador({});
      mostrarAlerta({
        error: true,
        msg: error.response.data.msg || error.response.statusText,
      });
    } finally {
      setCargandoColaborador(false);
    }
  };

  const agregarColaborador = async (id) => {
    setCargandoColaborador(true);
    const token = localStorage.getItem("Token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores/${proyecto._id}`,
        {
          id,
        },
        config
      );

      mostrarAlerta({
        error: false,
        msg: "Colaborador Agregado Exitosamente",
      });

      setColaborador({});
      navigate(`/proyectos/${proyecto._id}`);
    } catch (error) {
      setColaborador({});
      mostrarAlerta({
        error: true,
        msg: error.response.data.msg || error.response.statusText,
      });
    } finally {
      setCargandoColaborador(false);
    }
  };

  const eliminarColaborador = async (colaborador) => {
    const token = localStorage.getItem("Token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await clienteAxios.put(
      `/proyectos/colaboradores/${proyecto._id}`,
      {
        id: colaborador._id,
      },
      config
    );

    mostrarAlerta({
      error: false,
      msg: data.msg,
    });

    const proyectoActualizado = {
      ...proyecto,
    };

    proyectoActualizado.colaboradores = proyecto.colaboradores.filter(
      (c) => c._id !== colaborador._id
    );

    setProyecto(proyectoActualizado);
  };

  const completarTarea = async (id) => {
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clienteAxios.put(`/tareas/estado/${id}`, {}, config);

    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyecto.tareas.map((tarea) => {
      if (tarea._id === id) {
        tarea.estado = !tarea.estado;
      }
      return tarea;
    });

    setProyecto(proyectoActualizado);
    mostrarAlerta({
      error: false,
      msg: data.msg,
    });
  };

  const handleBuscador = () => {
    setBuscador(!buscador);
  };

  // Socket.io
  const submitTareasProyecto = (tareaNueva) =>{
    const proyectoActualizado = {
      ...proyecto,
    };

    proyectoActualizado.tareas = [...proyectoActualizado.tareas, tareaNueva];

    setProyecto(proyectoActualizado);
  }

  const cerrarSessionProyectos = () => {
    setProyectos([])
    setProyecto({})
    setAlerta({})
  }

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        eliminarProyecto,
        modalFormTarea,
        setModalFormTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        eliminarTarea,
        submitColaborador,
        cargandoColaborador,
        colaborador,
        agregarColaborador,
        eliminarColaborador,
        completarTarea,
        buscador,
        handleBuscador,
        submitTareasProyecto,
        cerrarSessionProyectos
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
