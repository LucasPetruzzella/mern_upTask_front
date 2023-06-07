import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const params = useParams();
  const { id } = params;
  const [alerta, setAlerta] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);

        setAlerta({
          error: false,
          msg: data.msg,
        });
        setConfirmed(true);
      } catch (error) {
        setAlerta({
          error: true,
          msg: error.response.data.msg || error.response.statusText,
        });
      }
    };

    confirmarCuenta();
  }, []);
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {" "}
        <Alerta alerta={alerta} />
        {confirmed && (
          <Link
            to="/"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
            {" "}
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
