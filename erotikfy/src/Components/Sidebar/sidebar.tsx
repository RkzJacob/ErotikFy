
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import "./sidebar.css";
import Home from "../../Assets/home.png";
import pornAvatar from "../../Assets/pornhub.avif";
import search from "../../Assets/search.png";
import creator from "../../Assets/creator.png";
import menu from "../../Assets/menu.png";

import agenda from "../../Assets/agenda.svg";

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
                <Link to="/listado"> {/* Navega a la página de Creadores */}
                  <img src={creator} alt="" />
                  <p>Creadores</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="list-main-item">
                <a href="">
                  <img src={search} alt="" />
                  <p>Buscar</p>
                </a>
              </div>
            </li>
            <li>
              <div className="list-main-item">
                <Link to="/mi-agenda">
                  <img src={agenda} alt="" />
                  <p>Agenda</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="list-main-item">
                <a href="/loguear-cuenta">
                  <img src={Home} alt="" />
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
                <a href="">
                  <img src={menu} alt="" />
                  <p>Config</p>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};