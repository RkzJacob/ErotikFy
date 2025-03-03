
import "./ads.css"; // Asegúrate de que el CSS está en la misma carpeta
import ads from '../../LocalImagen/ads.mp4' 
export const Ads = () => {
  return (
    <div className="container">
      {/* Contenedor del video */}
      <div className="video-container">
        <video className="video-player" controls>
          <source src= {ads} type="video/mp4" />
        </video>
      </div>

      {/* Contenedor del mensaje */}
      <div className="message-container">
        <p className="message-text">
          ¡Paga tu suscripción!
        </p>
      </div>
    </div>
  );
};

export default Ads;
