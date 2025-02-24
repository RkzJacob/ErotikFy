import './perfiluser.css';
import imagenUser from '../../assets/imagenUser.webp';

export const PerfilUser = () => {
    return(
        <section className="perfilUser">
            <div className="perfilUser__container">
                <div className="perfilUser__icon">
                    <img src={imagenUser} alt=""/>
                </div>
                <div className="perfilUser__info">
                    <h2 className='perfilUser__info-username'>kanashimip</h2>
                    <h2 className='perfilUser__info-apodo'>jacob </h2>
                </div>
            </div>
        </section>
    )
}
