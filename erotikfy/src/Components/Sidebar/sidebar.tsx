import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import "./sidebar.css";
import Home from "../../Assets/home.png";
import pornAvatar from "../../Assets/pornhub.avif";
import search from "../../Assets/search.png";
import live from "../../Assets/live.png";
import creator from "../../Assets/creator.png";
import menu from "../../Assets/menu.png";
import CreatePublicationPopup from "../CrearPosts/crearposts";
import createPost from "../../Assets/createPost.svg";
import agenda from "../../Assets/agenda.svg";

export const Sidebar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleCreateClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    openPopup(); // Abre el popup
  };

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
                <Link to="/mi-agenda"> {/* Navega a la página de Agenda */}
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
      <CreatePublicationPopup isOpen={isPopupOpen} onClose={closePopup} />
    </section>
  );
};