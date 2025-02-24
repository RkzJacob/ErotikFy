import React, { useState } from "react";
import './crearposts.css'
import imagenUser from '../../assets/imagenUser.webp';

interface CreatePublicationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePublicationPopup: React.FC<CreatePublicationPopupProps> = ({
  isOpen,
  onClose,
}) => {
    const [publicationName, setPublicationName] = useState("");
  const [publicationDescription, setPublicationDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [currentFileIndex, setCurrentFileIndex] = useState(0); // Índice de la imagen/video actual

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowPreview(true); // Mostrar la vista previa
  };

  const handlePublish = () => {
    console.log("Publicación enviada:", {
      publicationName,
      publicationDescription,
      files,
    });
    onClose(); // Cerrar el popup después de publicar
  };

  const handleNext = () => {
    setCurrentFileIndex((prevIndex) =>
      prevIndex === files.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentFileIndex((prevIndex) =>
      prevIndex === 0 ? files.length - 1 : prevIndex - 1
    );
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Crear Nueva Publicación</h2>

        {!showPreview ? (
          // Formulario para crear la publicación
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="publicationName">Nombre de la Publicación:</label>
              <input
                type="text"
                id="publicationName"
                value={publicationName}
                onChange={(e) => setPublicationName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="publicationDescription">Descripción:</label>
              <textarea
                id="publicationDescription"
                value={publicationDescription}
                onChange={(e) => setPublicationDescription(e.target.value)}
                rows={4}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fileUpload">Seleccionar Fotos/Videos:</label>
              <input
                type="file"
                id="fileUpload"
                onChange={(e) =>
                  setFiles(e.target.files ? Array.from(e.target.files) : [])
                }
                multiple
                accept="image/*, video/*"
              />
            </div>
            <button type="submit">Vista Previa</button>
          </form>
        ) : (
          // Vista previa de la publicación (como un post)
          <div className="post-preview">
            <div className="post-header">
                <div className="post-header-icon">
                    <img src={imagenUser}  alt="Perfil" className="profile-pic"/>
                </div>
                <div className="post-info-user">
                    <p>carlistosks</p>
                    <p> 1s</p>
                </div>
            </div>
            <div className="post-content">
                <div className="post-media">
                    {files[currentFileIndex].type.startsWith("image") ? (
                    <img
                        src={URL.createObjectURL(files[currentFileIndex])}
                        alt={`Preview ${currentFileIndex}`}
                    />
                    ) : (
                    <video controls>
                        <source
                        src={URL.createObjectURL(files[currentFileIndex])}
                        type={files[currentFileIndex].type}
                        />
                        Tu navegador no soporta el elemento de video.
                    </video>
                    )}
                    {files.length > 1 && (
                    <div className="media-navigation">
                        <button onClick={handlePrevious}>&lt;</button>
                        <button onClick={handleNext}>&gt;</button>
                    </div>
                    )}
                </div>
              <div className="post-content-description">
                <div className="content-title">
                    <strong>carlistosks</strong>
                    <p>{publicationName}</p>

                </div>
                <p className="content-description">{publicationDescription}</p>
              </div>
              
              <p className="file-counter">
                Archivo {currentFileIndex + 1} de {files.length}
              </p>
            </div>
            <div className="post-actions">
              <button onClick={() => setShowPreview(false)}>Editar</button>
              <button onClick={handlePublish}>Publicar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CreatePublicationPopup;