import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passWordModificado,setPassWordModificado] = useState(false)
  const params = useParams();
  const { token } = params;
  
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.get(
          `/usuarios/olvide-password/${token}`
        );

        setTokenValido(true);
      } catch(error) {
        setAlerta({
          error: true,
          msg: error.response.data.msg || error.response.statusText,
        });
      }
    };

    comprobarToken();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(password === ''){
        setAlerta({
            error: true,
            msg: "Debe ingresar un password",
          });
          return
    }

    try {
        const url = `/usuarios/nuevo-password/${token}`;
        const { data } = await clienteAxios.post(url,{
            password
        });
        
        setAlerta({
          error: false,
          msg: data.msg,
        });
        setPassWordModificado(true)
      } catch (error) {
        setAlerta({
          error: true,
          msg: error.response.data.msg || error.response.statusText,
        });
      }

  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu nueva password y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      { alerta.msg && <Alerta alerta={alerta} /> }

      {tokenValido && (
        <form onClick={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nuevo Password{" "}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Escribe tu nuevo password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            ></input>
          </div>

          <input
            type="submit"
            value="Guardar Password"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-600 transition-colors"
          />
        </form>
      )}

    {passWordModificado && (
          <Link
            to="/"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
            {" "}
            Iniciar Sesión
          </Link>
        )}
    </>
  );
};

export default NuevoPassword;
