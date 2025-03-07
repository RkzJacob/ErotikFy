import React, { useState } from "react";
import './crearposts.css'
import { useMutation } from "@apollo/client";
import { CREATE_POST, GET_URL } from "../../Mutations/mutations";
import { compressImage, fileToBase64 } from "../../Functions/functions";
import { GET_WEEKLY_FEED } from "../../Querys/querys";
import { Toaster, toast } from 'sonner'

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
  const  id =  userId; 
  const [createPost] = useMutation(CREATE_POST,{ 
    refetchQueries: [{query: GET_WEEKLY_FEED ,variables: {user_id:id}}]
  });
  const [obtenerUrl] = useMutation(GET_URL);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(files)
    event.preventDefault();
    setShowPreview(true); // Mostrar la vista previa
  };
  const resetForm = () => {
    setPublicationName("");
    setPublicationDescription("");
    setFiles([]);
    setShowPreview(false);
    setCurrentFileIndex(0);
};

  const uploadToCloudflare = async (file: File) =>{
      
    try {
      const compressedFile = await compressImage(file);
      const base64 = await fileToBase64(compressedFile);
      // const imageBase64 = base64.split(",")[1];


      const {data}= await obtenerUrl({
          variables: {base64File:base64},
      });

      if (!data || !data.GET_UPLOAD_URL) {
        console.error("Error al obtener la URL de subida", data);
        return null;
    }


      console.log("URL obtenida:", data.GET_UPLOAD_URL);
      return data.GET_UPLOAD_URL;

    } catch (error) {
        console.log("error",error)
        return null;
    }
    
  }

  const Agregar_post = async () =>{
      
    try {
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const imageUrl = await uploadToCloudflare(file);
        if (imageUrl) {
          uploadedUrls.push(imageUrl);
        }
      }
      if (uploadedUrls.length === 0) {
        console.error("No se subieron imágenes correctamente");
        return;
      }

      uploadedUrls.join(",")

      const variables = {
        user_id: userId,
        title: publicationName,
        descripcion: publicationDescription,
        media: uploadedUrls  // ⚠️ Asegurar que media es un array
    };

    console.log("📤 Datos enviados a la mutación:", JSON.stringify(variables, null, 2));

      await createPost({
          variables: {user_id:userId, title:publicationName,descripcion:publicationDescription,media:uploadedUrls},
      });

      toast.success('Agregado correctamente')
    } catch (error) {
      toast.error(`No se ha podido agregar el post ${error}`)
    }
}

  const handlePublish = () => {
    Agregar_post();
    resetForm();
    onClose(); // Cerrar el popup después de publicar
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
      <Toaster position="top-center"/>
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
              <label htmlFor="fileUpload"className="upload-button"><i className="fas fa-arrow-up" ></i> Seleccionar Foto</label>
              <input
                type="file"
                id="fileUpload"
                onChange={(e) =>
                  setFiles(e.target.files ? Array.from(e.target.files) : [])
                }
                multiple
                accept="image/*"
              />
            </div>
            <button type="submit">Vista Previa</button>
          </form>
        ) : (
          // Vista previa de la publicación (como un post)
          <div className="post-preview">
            <div className="post-header">
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
                </div>
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