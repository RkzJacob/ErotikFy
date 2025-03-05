import './inicio.css'; // Asegúrate de importar el archivo CSS
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import { useGET_ID, useGET_WEEKLY_FEED_ } from '../../Hooks/UseQuerys';
import profile from '../../LocalImagen/profile1.png';
import { useMutation } from '@apollo/client';
import { CREATE_COMENTARIO, CREATE_LIKE } from '../../Mutations/mutations';
import { useState, useEffect } from 'react'; // Importa useEffect
import { GET_WEEKLY_FEED } from '../../Querys/querys';
import { toast } from 'sonner';

export const Feed = () => {
  const id_usuario_storage = localStorage.getItem("nombre_usuario");
  const { data: dataUser } = useGET_ID(id_usuario_storage || "");
  const usuario = dataUser?.getOneFindUser.user_id || "";

  const [generarLike] = useMutation(CREATE_LIKE);
  const [createComentario] = useMutation(CREATE_COMENTARIO, {
    refetchQueries: [{ query: GET_WEEKLY_FEED, variables: { user_id: usuario } }]
  });
  const { data } = useGET_WEEKLY_FEED_(usuario);

  const [comentario, setComentario] = useState("");
  const [comentando, setComentando] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false); // Estado para detectar si es móvil

  // Función para detectar si la pantalla es móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Cambia el valor según tu breakpoint
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Llama a la función al cargar la página

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleComentario = async (post_id: string) => {
    try {
      if (comentario.trim() === "") {
        alert("Por favor, escribe un comentario.");
        return;
      }

      await createComentario({
        variables: { user_id: usuario, post_id: post_id, content: comentario }
      });

      setComentario("");
      setComentando(null);
      toast.success(`El comentario se ha subido con éxito`);
    } catch (error) {
      toast.error(`No se ha podido subir el comentario ${error}`);
    }
  };

  // Función para deshabilitar el clic derecho
  const handleImageContextMenu = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
  };

  const handleLike = async (post_id: string) => {
    try {
      await generarLike({
        variables: { user_id: usuario, post_id: post_id }
      });
      toast.success(`Le has dado like con éxito`);
    } catch (error) {
      toast.error(`No se ha podido dar like ${error}`);
    }
  };

  const getMediaUrl = (media: string) => {
    try {
      // Verifica si `media` empieza con "[" para determinar si es un array JSON
      if (media.startsWith("[") && media.endsWith("]")) {
        const mediaArray = JSON.parse(media);
        return Array.isArray(mediaArray) && mediaArray.length > 0 ? mediaArray[0] : null;
      }
      // Si no es un JSON, asumimos que es una URL y la devolvemos directamente
      return media;
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
              <div key={post.post_id} className="feed-item">
                <div className="feed-info-container">
                  <Link to={`/perfil/${post.user_id}`}>
                    <img
                      src={post.usuario.profile_picture} // Usar la URL obtenida o un valor vacío si no hay URL
                      alt={`${post.usuario.profile_picture}'s profile`}
                      className="feed-profile-pic"
                      onContextMenu={handleImageContextMenu} // Deshabilita el clic derecho
                    />
                  </Link>
                  <Link to={`/perfil/${post.user_id}`}>
                    <span className="feed-username">{post.usuario.username}</span>
                  </Link>
                  
                </div>
                <div className="rows-content">
                  {/* Contenedor de la imagen con protección */}
                  <div className="feed-item-image-container">
                    <img
                      src={mediaUrl || ""} // Usar la URL obtenida o un valor vacío si no hay URL
                      alt={`Post by ${post.post_id}`}
                      className="feed-item-image"
                      onContextMenu={handleImageContextMenu} // Deshabilita el clic derecho
                    />
                    {/* Superposición transparente */}
                    <div className="image-protection-overlay" />
                  </div>

                  {/* Contenedor de comentarios */}
                  <div className="comments-container">
                    {/* Mostrar solo los últimos 2 comentarios en móvil */}
                    {(isMobile ? post.comments.slice(-2) : post.comments.slice(0, 6)).map((comment) => (
                      <div key={comment.comment_id} className="comment">
                        <div className="comment-content">
                          <img
                            src={profile}
                            alt={`Profile of ${comment.user?.username}`}
                            className="comment-profile-pic"
                          />
                          <span className="comment-username">{comment.user?.username}: </span>
                          <span className="comment-text">{comment.content}</span>
                        </div>
                      </div>
                    ))}
                    {comentando === post.post_id && (
                      <div className="comment-section">
                        <input
                          value={comentario}
                          onChange={(e) => setComentario(e.target.value)}
                          placeholder="Escribe un comentario..."
                        />
                        <button onClick={() => handleComentario(post.post_id)}>
                          <i className="fa fa-comment"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  </div>
                  <p></p>
                  <div className="feed-buttons">
                    <button className="like-button" onClick={() => handleLike(post.post_id)}>
                      <i className="fa fa-heart"></i>
                    </button>
                    <button className="comment-button" onClick={() => setComentando(post.post_id)}>
                      <i className="fa fa-comment"></i>
                    </button>
                </div>
                <div className="feed-description-container">
                      <p className="feed-description">{post.description}</p>
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