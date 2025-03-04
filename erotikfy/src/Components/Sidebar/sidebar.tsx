
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import "./sidebar.css";
import Home from "../../Assets/home.png";
import pornAvatar from "../../Assets/pornhub.avif";
import search from "../../Assets/search.png";
import creator from "../../Assets/creator.png";
import user from "../../assets/user.png";
import exit from "../../assets/exit.png"

export const Sidebar = () => {

  return (
    <section className="sidebar">
      <div className="sidebar-complete">
        <div className="sidebar-img">
          <img src={pornAvatar} alt="" />
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
            <li>
              <div className="list-main-item">
                <a href="/loguear-cuenta">
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