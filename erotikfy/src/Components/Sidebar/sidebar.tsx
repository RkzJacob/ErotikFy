
import { Link, useNavigate } from "react-router-dom"; // Importa Link desde react-router-dom
import "./sidebar.css";
import Home from "../../assets/home.png";
import logo from "../../assets//logo.png";
import search from "../../assets//search.png";
import creator from "../../assets//creator.png";
import user from "../../assets/user.png";
import exit from "../../assets/exit.png"
import volver from "../../assets/volver.png"; // Asegúrate de que la ruta es correcta

import Cookies from "js-cookie";
import { toast } from "sonner";

export const Sidebar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const handleBack = () => {
    navigate(-1); // Vuelve a la página anterior
  };
  
    const handleLogout =() =>{
        localStorage.removeItem("nombre_usuario");
        Cookies.remove("token");
        Cookies.remove("time_video_player");

        toast.success(`Se ha cerrado sesión con exito`);
        navigate("/")
    }

  return (
    <section className="sidebar">
      <div className="sidebar-complete">
        <div className="sidebar-img">
          <img src={logo} alt="" />
        </div>
        <div className="sidebar-list-main">
          <ul>
            <li>
              <div className="list-main-item">
                <Link to="/Inicio">
                  <img src={Home} alt="" />
                  <p>Inicio</p>
                </Link>
              </div>
            </li>
            {role === "admin" && (
              <>
            <li>
              <div className="list-main-item">
                <Link to="/search-users"> {/* Navega a la página de Creadores */}
                  <img src={search} alt="" />
                  <p>Buscar</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="list-main-item">
                <Link to="/listado"> {/* Navega a la página de Creadores */}
                  <img src={creator} alt="" />
                  <p>Creadores</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="list-main-item">
                <Link to="/Usuarios"> {/* Navega a la página de Creadores */}
                  <img src={user} alt="" />
                  <p>Usuarios</p>
                </Link>
              </div>
            
            </li>
            </>
            )}

              <li>
                <div className="list-main-item">
                  <a onClick={handleBack} style={{ cursor: "pointer" }}>
                    <img src={volver} alt="Volver" />
                     <p>Volver</p>
                   </a>
                  </div>
              </li>

              <li>
              <div className="list-main-item">
                <a  onClick={handleLogout}>
                  <img src={exit} alt="" />
                  <p>Cerrar Sesion</p>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className="sidebar-list-settings">
          <ul>
            <li>
              <div className="list-main-item">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};