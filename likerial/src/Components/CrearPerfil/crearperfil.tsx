import React, { useState } from "react";
import './crearperfil.css';
import { useMutation } from "@apollo/client";
import imageCompression from 'browser-image-compression';
import { CREATE_USER } from "../../Mutations/mutations"; // Suponiendo que tienes una mutación para crear usuario

interface CreateProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
}

const CreateProfilePopup: React.FC<CreateProfilePopupProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [profileName, setProfileName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Estado para la vista previa de la imagen
  const [createUser] = useMutation(CREATE_USER); // Mutación para crear un usuario

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verificar que todos los campos estén llenos
    if (!profileName || !profileDescription || files.length === 0) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      // Comprimir las imágenes
      const compressedFiles = await Promise.all(
        files.map((file) => compressImage(file))
      );

      // Convertir las imágenes comprimidas a base64
      const mediaArray = await Promise.all(
        compressedFiles.map(async (file) => {
          const base64 = await fileToBase64(file);
          return base64.split(",")[1]; // Eliminar el prefijo "data:image/jpeg;base64,"
        })
      );

      const mediaString = mediaArray.join(",");

      // Crear el perfil usando la mutación
      const { data } = await createUser({
        variables: { user_id: userId, name: profileName, description: profileDescription, media: mediaString, price: "0" },
      });

      // Notificación de éxito
      alert("Perfil creado con éxito!");
      console.log("Perfil creado:", data);
      onClose(); // Cerrar el popup después de crear el perfil
    } catch (error) {
      console.error("Error al crear perfil:", error);
      alert("Ocurrió un error al crear el perfil. Inténtalo de nuevo.");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFiles([file]); // Almacenar el archivo seleccionado
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Establecer la imagen seleccionada como vista previa
      };
      reader.readAsDataURL(file);
    }
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
              onChange={handleImageChange}
              accept="image/*"
              required
              style={{ display: "none" }} // Ocultar el input de archivo
            />
          </div>
          <button type="submit">Crear Perfil</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfilePopup;
