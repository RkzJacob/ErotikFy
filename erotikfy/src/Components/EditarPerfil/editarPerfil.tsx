import React, { useEffect, useState } from "react";
import '../CrearPerfil/crearperfil.css';
import { useMutation } from "@apollo/client";
import { ACTUALIZAR_CREATOR, GET_URL_CREATOR } from "../../Mutations/mutations";
import { compressImage, fileToBase64 } from "../../Functions/functions";
import { GET_ALL_CREATORS } from "../../Querys/querys";
import { toast } from "sonner";
import { useGET_INFO_CREATOR } from "../../Hooks/UseQuerys";

interface EditProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
    const {data,loading,error,refetch} = useGET_INFO_CREATOR(userId || "");
    const id = userId;

    const [profileName, setProfileName] = useState("");
    const [profileDescription, setProfileDescription] = useState("");
    const [files, setFiles] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null); // Estado para la vista previa de la imagen
    const [obtenerUrlCreator] = useMutation(GET_URL_CREATOR);
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
  
    const [actualizarCreator] = useMutation(ACTUALIZAR_CREATOR,{refetchQueries:[{ query: GET_ALL_CREATORS }]});

    useEffect(() => {
        if (isOpen && data?.getOneFindUserID) {
            setProfileName(data.getOneFindUserID.username);
            setProfileDescription(data.getOneFindUserID.bio);
            setImagePreview(data.getOneFindUserID.profile_picture || null);
        } else if (!isOpen) {
            resetForm(); // Resetear los datos cuando el popup se cierre
        }
    }, [isOpen, userId,data]);
    
   
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
    
    const Editar_user = async () => {
        try {
          let variablesToUpdate: { user_id?:string,username?: string; profile_picture?: string; bio?: string } = {};

          if (id){
            variablesToUpdate.user_id =id;
          }
      
          if (profileName !== data?.getOneFindUserID.username) {
            variablesToUpdate.username = profileName;
          }
          if (profileDescription !== data?.getOneFindUserID.bio) {
            variablesToUpdate.bio = profileDescription;
          }
      
          if (files) {
            const imageUrl = await uploadToCloudflare(files);
            if (!imageUrl) {
              console.error("No se subió la imagen correctamente");
              return;
            }
            variablesToUpdate.profile_picture = imageUrl;
          }
      
          // Si no hay cambios, salir de la función
          if (Object.keys(variablesToUpdate).length === 0) {
            toast.info("No hay cambios para actualizar.");
            return;
          }
      
          await actualizarCreator({ variables: variablesToUpdate });
          await refetch();

          if (variablesToUpdate.username) setProfileName(variablesToUpdate.username);
        if (variablesToUpdate.bio) setProfileDescription(variablesToUpdate.bio);
        if (variablesToUpdate.profile_picture) setImagePreview(variablesToUpdate.profile_picture);
      
          toast.success(`Perfil actualizado correctamente`);
        } catch (error) {
          toast.error(`Error al actualizar el perfil: ${error}`);
        }
      };
    
  

      const handlePublish = () => {
        Editar_user();
        resetForm();
        onClose(); // Cerrar el popup después de publicar
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
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar usuario</p>;
  
    return (
      <div className="popup-overlay">
        <div className="popup-container">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <h2>Editar Perfil</h2>
  
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="profileName">Nombre del Perfil: </label>
              <input
                type="text"
                id="profileName"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="profileDescription">Descripción: </label>
              <textarea
                id="profileDescription"
                value={profileDescription}
                onChange={(e) => setProfileDescription(e.target.value)}
                rows={4}
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
                 
              />
            </div>
            <button type="submit" onClick={handlePublish}>Editar Perfil</button>
          </form>
        </div>
      </div>
    );
  };

export default EditProfilePopup;
