import './inicio.css'; // Asegúrate de importar el archivo CSS
import img2 from '../../LocalImagen/img2.jpg';
import img3 from '../../LocalImagen/img3.jpg';
import img5 from '../../LocalImagen/img5.jpg';
import img7 from '../../LocalImagen/profile.jpg';
export const Feed = () => {
    const posts = [
      {
        id: 1,
        profileImage: img7,
        username: 'Valeria',
        image: img3,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, facilis provident.',
        comments: [
          { username: 'Juan', text: '¡Me encanta esta publicación!' },
          { username: 'Ana', text: '¡Muy interesante!' },
          { username: 'Ana', text: '¡Muy interesante!' },
          { username: 'Ana', text: '¡Muy interesante!' },
        ],
      },
      {
        id: 2,
        profileImage: img7,
        username: 'Valeria',
        image: img2,
        description: 'Aquí va la descripción de la segunda publicación.',
        comments: [
          { username: 'Carlos', text: 'Gran trabajo, Valeria!' },
        ],
      },
      {
        id: 3,
        profileImage: img7,
        username: 'Valeria',
        image: img5,
        description: 'Y esta es la descripción de la tercera publicación.',
        comments: [
          { username: 'Lucía', text: 'Me encanta el estilo de tu foto.' },
          { username: 'Pablo', text: 'Increíble publicación.' },
        ],
      },
    ];
  
    return (
      <div className="feed-background">
        <div className="feed-container">
          <div className="feed-list">
            {posts.map((post) => (
              <div key={post.id} className="feed-item">
                <div className="feed-info-container">
                  <img
                    src={post.profileImage}
                    alt={`${post.username}'s profile`}
                    className="feed-profile-pic"
                  />
                  <span className="feed-username">{post.username}</span>
                  <div className="feed-buttons">
                    <button className="like-button">
                      <i className="fa fa-heart"></i>
                    </button>
                    <button className="comment-button">
                      <i className="fa fa-comment"></i>
                    </button>
                  </div>
                </div>
                <div className="feed-content">
                  <div className="feed-description-container">
                    <p className="feed-description">{post.description}</p>
                  </div>
                  <img
                    src={post.image}
                    alt={`Post by ${post.username}`}
                    className="feed-item-image"
                  />
                </div>
                {/* Contenedor de comentarios */}
                <div className="comments-container">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="comment">
                      <span className="comment-username">{comment.username}: </span>
                      <span className="comment-text">{comment.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  

export default Feed;
