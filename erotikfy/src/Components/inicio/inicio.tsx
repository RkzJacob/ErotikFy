import './inicio.css'; // Asegúrate de importar el archivo CSS

import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import { useGET_ID, useGET_WEEKLY_FEED_ } from '../../Hooks/UseQuerys';
import profile from '../../LocalImagen/profile.jpg'

export const Feed = () => {
  const id_usuario_storage = localStorage.getItem("nombre_usuario");
  const {data:dataUser} = useGET_ID(id_usuario_storage || "");
  
  const usuario = dataUser?.getOneFindUser.user_id || "";
  

  const {data,loading,error} = useGET_WEEKLY_FEED_(usuario);

  // Función para deshabilitar el clic derecho
  const handleImageContextMenu = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
  };

  const getMediaUrl = (media: string) => {
    try {
      const mediaArray = media ? JSON.parse(media) : [];
      return mediaArray.length > 0 ? mediaArray[0] : null; // Retorna la primera URL si existe
    } catch (error) {
      console.error("Error al parsear media:", error);
      return null; // En caso de error en el parseo, retorna null
    }
  };

  return (
    <div className="feed-background">
      <div className="feed-container">
        <div className="feed-list">
          {data?.GET_WEEKLY_FEED.map((post) => {
            // Llamar a la función para obtener la URL del media
            const mediaUrl = getMediaUrl(post.media);

            return (
              <div key={post.user_id} className="feed-item">
                <div className="feed-info-container">
                  <Link to="/Perfil">
                    <img
                      src={mediaUrl || ""} // Usar la URL obtenida o un valor vacío si no hay URL
                      alt={`${post.usuario.profile_picture}'s profile`}
                      className="feed-profile-pic"
                      onContextMenu={handleImageContextMenu} // Deshabilita el clic derecho
                    />
                  </Link>
                  <Link to="/Perfil">
                    <span className="feed-username">{post.usuario.username}</span>
                  </Link>
                  <div className="feed-buttons">
                    <button className="like-button">
                      <i className="fa fa-heart"></i>
                    </button>
                    <button className="comment-button">
                      <i className="fa fa-comment"></i>
                    </button>
                  </div>
                </div>
                <div className="rows-content">
                  <div className="feed-content">
                    
                    {/* Contenedor de la imagen con protección */}
                    <div className="feed-item-image-container">
                      <img
                        src={mediaUrl || ""} // Usar la URL obtenida o un valor vacío si no hay URL
                        alt={`Post by ${post.post_id}`}
                        className="feed-item-image"
                        onContextMenu={handleImageContextMenu} // Deshabilita el clic derecho
                      />
                      <div className="feed-description-container">
                      <p className="feed-description">{post.description}</p>
                      </div>
                      {/* Superposición transparente */}
                      <div className="image-protection-overlay" />
                    </div>
                  </div>
                  {/* Contenedor de comentarios */}
                  <div className="comments-container">
                    {post.comments.slice(0, 6).map((comment) => (
                      <div key={comment.comment_id} className="comment">
                        
                        <div className="comment-content">
                            <img
                              src={ profile}
                              alt={`Profile of ${comment.user?.username}`}
                              className="comment-profile-pic"
                            />
                          <span className="comment-username">{comment.user?.username}: </span>
                          <span className="comment-text">{comment.content}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Feed;