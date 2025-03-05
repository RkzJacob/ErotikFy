import React, { useState } from "react";
import './crearperfil.css';
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER_CREATOR, GET_URL_CREATOR } from "../../Mutations/mutations";
import { compressImage, fileToBase64 } from "../../Functions/functions";
import { GET_ALL_CREATORS } from "../../Querys/querys";
import { toast } from "sonner";
import { ListCreators } from "../../Interfaces/interfaces";

interface CreateProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProfilePopup: React.FC<CreateProfilePopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [profileName, setProfileName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [files, setFiles] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null); // Estado para la vista previa de la imagen
  
  const [obtenerUrlCreator] = useMutation(GET_URL_CREATOR);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  };

  const [createCreator] = useMutation(CREATE_USER_CREATOR,{refetchQueries:[{ query: GET_ALL_CREATORS }]});

  const resetForm = () => {
    setProfileName("");
    setProfileDescription("");
    setFiles(null);
    setImagePreview(null);
  };
  
  const uploadToCloudflare = async (file: File) =>{
        
      try {
        const compressedFile = await compressImage(file);
        const base64 = await fileToBase64(compressedFile);
        // const imageBase64 = base64.split(",")[1];
  
  
        const {data}= await obtenerUrlCreator({
            variables: {base64File:base64},
        });
  
        if (!data || !data.GET_UPLOAD_URL_CREATOR) {
          console.error("Error al obtener la URL de subida", data);
          return null;
      }
  
  
        console.log("URL obtenida:", data.GET_UPLOAD_URL_CREATOR);
        return data.GET_UPLOAD_URL_CREATOR;
  
      } catch (error) {
          console.log("error",error)
          return null;
      }
      
  }
  
    const Agregar_user = async () =>{
        
      try {
        if(!files){
          console.error("No se ha seleccionado una foto de perfil");
          return;
        }
  
        const imageUrl = await uploadToCloudflare(files);

        if (!imageUrl) {
          console.error("No se subió la imagen correctamente");
          return;
        }
        

        await createCreator({
            variables: {username:profileName, contrasena:"pruebasagaas",profile_picture:imageUrl,bio:profileDescription}
        });

        toast.success(`Se ha creado con exito el usuario ${profileName}`)
      } catch (error) {
        toast.error(`No se ha podido crear el usuario ${profileName} error: ${error}`)
      }
  }
  

  const obtenerCreadores = () =>{
    const result = useQuery<ListCreators>(GET_ALL_CREATORS)
    return result
  }
    const handlePublish = () => {
      Agregar_user();
      resetForm();
      onClose(); // Cerrar el popup después de publicar
      obtenerCreadores();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      setFiles(file);
  
      // Vista previa de la imagen
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
 

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Crear Nuevo Perfil</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="profileName">Nombre del Perfil:</label>
            <input
              type="text"
              id="profileName"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="profileDescription">Descripción:</label>
            <textarea
              id="profileDescription"
              value={profileDescription}
              onChange={(e) => setProfileDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="fileUpload">Foto de perfil:</label>
            {!imagePreview ? (
              <label htmlFor="fileUpload" className="upload-button">
                <i className="fas fa-arrow-up"></i> Subir Foto
              </label>
            ) : (
              <div className="image-preview">
                <img src={imagePreview} alt="Vista previa" className="image-preview-img" />
              </div>
            )}
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileChange}
              accept="image/*"
              required
              style={{ display: "none" }} // Ocultar el input de archivo
            />
          </div>
          <button type="submit" onClick={handlePublish}>Crear Perfil</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfilePopup;
