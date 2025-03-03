import "./ads.css"; // Asegúrate de que el CSS está en la misma carpeta
import ads from '../../LocalImagen/ads.mp4';

export const Ads = () => {
  return (
  <div className="container-ads">
    <div className="video-wrapper">
      <div className="video-container">
        <video className="video-player" src={ads} controls></video>
      </div>
    </div>

    <div className="neon-sign">
      <p>¡Paga tu suscripción!</p>
    </div>
  </div>
  );
};

export default Ads;
