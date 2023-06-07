import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import NuevoPassword from "./pages/NuevoPassword";
import OlvidePassword from "./pages/OlvidePassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import { AuthProvider } from "./context/AuthProvider";
import RutaProtegida from "./layout/RutaProtegida";
import Proyectos from "./pages/Proyectos";
import NuevoProyecto from "./pages/NuevoProyecto";
import { ProyectosProvider } from "./context/ProyectoProvider";
import Proyecto from "./pages/Proyecto";
import EditarProyecto from "./pages/EditarProyecto";
import NuevoColaborador from "./pages/NuevoColaborador";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />}></Route>
            <Route path="registrar" element={<Registrar />}></Route>
            <Route path="olvide-password" element={<OlvidePassword />}></Route>
            <Route
              path="olvide-password/:token"
              element={<NuevoPassword />}
            ></Route>
            <Route path="confirmar/:id" element={<ConfirmarCuenta />}></Route>
          </Route>
          <Route path="/proyectos" element={<RutaProtegida />}>
            <Route index element={<Proyectos />}></Route>
            <Route path="nuevo-colaborador/:id" element={<NuevoColaborador />}></Route>
            <Route path="crear-proyecto" element={<NuevoProyecto />}></Route>
            <Route path=":id" element={<Proyecto />}></Route>
            <Route path="editar/:id" element={<EditarProyecto />}></Route>
          </Route>
        </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
