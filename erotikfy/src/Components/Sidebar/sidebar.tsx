import './sidebar.css'
import Home from '../../Assets/home.png'
import pornAvatar from '../../Assets/pornhub.avif'
import search from '../../Assets/search.png'
import live from '../../Assets/live.png'
import creator from '../../Assets/creator.png'
import menu from '../../Assets/menu.png'
import { useState } from 'react'
import CreatePublicationPopup from '../CrearPosts/crearposts'
import createPost from '../../Assets/createPost.svg'
import wallet from '../../Assets/wallet.svg'
import agenda from '../../Assets/agenda.svg'


export const Sidebar = () =>{
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
                                <a href="">
                                    <img src={Home} alt="" />
                                    <p>Home </p>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="list-main-item">
                                <a href="">
                                    <img src={creator} alt="" />
                                    <p>Creadores</p>
                                </a>
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
                                <a href="">
                                    <img src={live} alt="" />
                                    <p>Live</p>
                                </a>
                            </div>
                            
                        </li>
                        <li>
                            <div className="list-main-item">
                                <a href="">
                                    <img src={createPost} alt="" />
                                    <p onClick={handleCreateClick}>Crear</p>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="list-main-item">
                                <a href="">
                                    <img src={wallet} alt="" />
                                    <p>Cartera</p>
                                </a>
                            </div>
                            
                        </li>
                        <li>
                            <div className="list-main-item">
                                <a href="">
                                    <img src={agenda} alt="" />
                                    <p>Agenda</p>
                                </a>
                            </div>
                            
                        </li>
                        <li>
                            <div className="list-main-item">
                                <a href="">
                                    <img src={Home} alt="" />
                                    <p>Cerrar Sesion</p>
                                </a>
                            </div>
                            
                        </li>
                    </ul>
                </div>
                <div className="sidebar-list-settings">
                    <ul>
                        <li><a href=""><img src={menu} alt="" />...</a></li>
                    </ul>
                </div>
            </div>
            <CreatePublicationPopup isOpen={isPopupOpen} onClose={closePopup} />
        </section>
        
    )
}