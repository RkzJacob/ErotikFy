import './pedidos.css';
import user from '../../assets/user.png';
import pedidosIcon from '../../assets/pedidosIcon.svg';
import { PerfilUser } from '../PerfilUser/perfiluser';

export const PedidosList = () => {
    return (
        <section className="pedidos">
            <div className="pedidos__container">
                <div className="pedidos__container-title">
                    <img src={pedidosIcon} alt="" />
                    <h1>Pedidos Personalizados</h1>
                </div>
                <div className="pedidosUsuarios__cards">
                    <div className="pedidoUsuario__card">
                        <div className="card-title">
                            <h2>Video Bailando</h2>
                            <h2>Pedido: June 30,2023</h2>
                        </div>
                        <div className="card-content">
                            <div className="card-content-user">
                                <img src={user} alt="" />
                                <h2>Juantio</h2>
                            </div>
                            <p>lo que quiero es un video detallaado de </p>
                            <div className="card-content-buttons">
                                <button>Enviar Video</button>
                                <button>Rechazar Video</button>
                            </div>
                        </div>
                        
                    </div>
                    <div className="pedidoUsuario__card">
                        <div className="card-title">
                            <h2>Video Bailando</h2>
                            <h2>Pedido: June 30,2023</h2>
                        </div>
                        <div className="card-content">
                            <div className="card-content-user">
                                <img src={user} alt="" />
                                <h2>Juantio</h2>
                            </div>
                            <p>lo que quiero es un video detallaado de </p>
                            <div className="card-content-buttons">
                                <button>Enviar Video</button>
                                <button>Rechazar Video</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    )
}