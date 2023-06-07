import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioColaborador = () => {
  const [email, setEmail] = useState("");
  const { alerta, mostrarAlerta, submitColaborador, proyecto } = useProyectos();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      mostrarAlerta({
        msg: "El Email es obligatorio",
        error: true,
      });
    }

    submitColaborador(email);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
    >
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="email"
        >
          Email Colaborador
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email del colaborador"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>

      {alerta.msg && <Alerta alerta={alerta} />}

      <input
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
        value="Buscar Colaborador"
      ></input>
    </form>
  );
};

export default FormularioColaborador;
