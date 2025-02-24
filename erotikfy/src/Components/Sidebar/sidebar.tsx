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
                        <li><img src={Home} alt="" /><a href="#">Inicio</a></li>
                        <li><img src={creator} alt="" /><a href="">Creadores</a></li>
                        <li><img src={search} alt="" /><a href="">Buscar</a></li>
                        <li><img src={live} alt="" /><a href="">Live</a></li>
                        <li><img src={createPost} alt="" /><a href="" onClick={handleCreateClick}>Crear</a></li>
                        <li><img src={wallet} alt="" /><a href="">Cartera</a></li>
                        <li><img src={agenda} alt="" /><a href="">Agenda</a></li>
                        <li><img src={Home} alt="" /><a href="" >Cerrar Sesion</a></li>
                    </ul>
                </div>
                <div className="sidebar-list-settings">
                    <ul>
                        <li><img src={menu} alt="" /><a href="">...</a></li>
                    </ul>
                </div>
            </div>
            <CreatePublicationPopup isOpen={isPopupOpen} onClose={closePopup} />
        </section>
        
    )
}