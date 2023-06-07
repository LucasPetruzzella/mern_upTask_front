import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const OlvidePassword = () => {
  const [email,setEmail] = useState('')
  const [alerta,setAlerta] = useState({})
  
  const handleSubmit = async(e) => {
    e.preventDefault()

    if(email === '' || email.length < 6){
      setAlerta({
        error: true,
        msg: "Debe ingresar un email"
      })
      return
    }

    try{
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {
        email
      })

      setAlerta({
        error: false,
        msg: data.msg,
      });
    }catch(error){
      setAlerta({
        error: true,
        msg: error.response.data.msg || error.response.statusText,
      });
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupera el acceso a tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

    {
      alerta.msg && (
        <Alerta alerta={alerta} />
      )
    }

      <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email{" "}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          ></input>
        </div>

        <input
          type="submit"
          value="Enviar email"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-600 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          ¿Ya tienes cuenta? Iniciar sesión
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
