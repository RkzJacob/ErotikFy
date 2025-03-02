import React, { useState } from "react";
import './crearposts.css'
import imagenUser from '../../assets/imagenUser.webp';
import { useMutation } from "@apollo/client";
import imageCompression from 'browser-image-compression';
import { CREATE_POST } from "../../Mutations/mutations";

interface CreatePublicationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
}

const CreatePublicationPopup: React.FC<CreatePublicationPopupProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [publicationName, setPublicationName] = useState("");
  const [publicationDescription, setPublicationDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [currentFileIndex, setCurrentFileIndex] = useState(0); // Índice de la imagen/video actual
  const [createpost] = useMutation(CREATE_POST);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(files)
    event.preventDefault();
    setShowPreview(true); // Mostrar la vista previa
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1, // Tamaño máximo en MB
      maxWidthOrHeight: 1024, // Resolución máxima
      useWebWorker: true,
    };
  
    return await imageCompression(file, options);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const Agregar_post = async () =>{
      
    try {
      const compressedFiles = await Promise.all(
        files.map((file) => compressImage(file))
      );

      const mediaArray = await Promise.all(
        compressedFiles.map(async (file) => {
          const base64 = await fileToBase64(file);
          return base64.split(",")[1]; // Eliminar el prefijo "data:image/jpeg;base64,"
        })
      );

      const mediaString = mediaArray.join(",");

      const {data}= await createpost({
          variables: {user_id:userId, title:publicationName,descripcion:publicationDescription,media:mediaString,price:"0"},
        });
      console.log("error",data)
    } catch (error) {
        console.log("error",error)
    }
}

  const handlePublish = () => {
    Agregar_post();
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