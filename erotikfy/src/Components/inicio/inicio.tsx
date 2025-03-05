import './inicio.css';
import { Link } from "react-router-dom";
import { useGET_ID, useGET_WEEKLY_FEED_ } from '../../Hooks/UseQuerys';
import profile from '../../LocalImagen/profile1.png';
import { useMutation } from '@apollo/client';
import { CREATE_COMENTARIO, CREATE_LIKE } from '../../Mutations/mutations';
import { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

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
      if (media.startsWith("[") && media.endsWith("]")) {
        const mediaArray = JSON.parse(media);
        return Array.isArray(mediaArray) && mediaArray.length > 0 ? mediaArray[0] : null;
      }
      return media;
    } catch (error) {
      console.error("Error al parsear media:", error);
      return null;
    }
  };

  return (
    <div className="feed-background">
      <div className="feed-container">
        <div className="feed-list">
          {data?.GET_WEEKLY_FEED.map((post) => {
            const mediaUrl = getMediaUrl(post.media);

            return (
              <div key={post.post_id} className="feed-item">
                <div className="feed-info-container">
                  <Link to={`/perfil/${post.user_id}`}>
                    <img
                      src={post.usuario.profile_picture}
                      alt={`${post.usuario.profile_picture}'s profile`}
                      className="feed-profile-pic"
                      onContextMenu={handleImageContextMenu}
                    />
                  </Link>
                  <Link to={`/perfil/${post.user_id}`}>
                    <span className="feed-username">{post.usuario.username}</span>
                  </Link>
                </div>
                <div className="rows-content">
                  <div className="feed-item-image-container">
                    <img
                      src={mediaUrl || ""}
                      alt={`Post by ${post.post_id}`}
                      className="feed-item-image"
                      onContextMenu={handleImageContextMenu}
                    />
                    <div className="image-protection-overlay" />
                  </div>

                  <div className="comments-container">
                    {/* Mostrar solo el último comentario en móvil, todos en escritorio */}
                    {(isMobile ? post.comments.slice(-1) : post.comments).map((comment) => (
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

                    {/* Sección para agregar un nuevo comentario */}
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
                <div className="feed-buttons">
                  <button className="like-button" onClick={() => handleLike(post.post_id)}>
                    <i className="fa fa-heart"></i>
                  </button>
                  <button className="comment-button" onClick={() => setComentando(post.post_id)}>
                    <i className="fa fa-comment"></i>
                  </button>
                </div>
                <div className="feed-description-container">
                  <p className="feed-description">Creador de contenido: {post.description}</p>
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