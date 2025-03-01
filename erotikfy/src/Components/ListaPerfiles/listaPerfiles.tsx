import { useState } from "react";
import { FaUserPlus } from "react-icons/fa"; // Importa el ícono de agregar persona
import { MdFileUpload } from "react-icons/md"; // Importa el ícono de subir archivo
import "./listaPerfiles.css"; // Importa el archivo CSS que proporcionaste
import CreatePublicationPopup from "../CrearPosts/crearposts";
import { useGetallCreators } from "../../Hooks/UseQuerys";

interface Perfil {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

export const ListPerfiles = () => {
  const {data,loading,error} = useGetallCreators();
  const [modalImagen, setModalImagen] = useState<string | null>(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false); // Estado para controlar la ventana emergente

  const openModal = (imagen: string) => {
    setModalImagen(imagen);
  };

  const closeModal = () => {
    setModalImagen(null);
  };

  // Función para manejar el clic en el botón flotante
  const handleAddPerson = () => {
    alert("Agregar nueva persona"); // Puedes reemplazar esto con la lógica que desees
  };

  // Función para abrir la ventana emergente de creación de posts
  const handleUploadFile = () => {
    setIsCreatePostOpen(true); // Abre la ventana emergente
  };

  // Función para cerrar la ventana emergente de creación de posts
  const handleCloseCreatePost = () => {
    setIsCreatePostOpen(false); // Cierra la ventana emergente
  };

  if(loading) return <p>loading...</p>
  if(error)return <p>error: {error.message}</p>

  return (
    <section className="profile-list-background">
      <div className="profile-list-container">
        {/* Lista de perfiles */}
        <div className="profile-list">
          {data?.AllUsersWithCounts.map((perfil:any) => (
            <div key={perfil.user_id} className="profile-list-item">
              <img
                src={perfil.profile_picture}
                alt={`Foto de perfil de ${perfil.username}`}
                className="profile-list-image"
                onClick={() => openModal(perfil.profile_picture)}
              />
              <div className="profile-list-info">
                <h3 className="profile-list-name">{perfil.username}</h3>
                <p className="profile-list-description">{perfil.bio}</p>
              </div>
              {/* Botón de subir archivo */}
              <button
                className="upload-button"
                onClick={handleUploadFile} // Abre la ventana emergente al hacer clic
              >
                <MdFileUpload size={24} /> {/* Ícono de subir archivo */}
              </button>
            </div>
          ))}
        </div>

        {/* Modal para mostrar la imagen en grande */}
        {modalImagen && (
          <div className="modal" onClick={closeModal}>
            <img src={modalImagen} className="modal-content" alt="Ampliada" />
          </div>
        )}

        {/* Botón flotante para agregar persona */}
        <button className="floating-button" onClick={handleAddPerson}>
          <FaUserPlus size={24} /> {/* Ícono de agregar persona */}
        </button>

        {/* Ventana emergente para crear posts */}
        <CreatePublicationPopup
          isOpen={isCreatePostOpen} // Controla si la ventana está abierta
          onClose={handleCloseCreatePost} // Función para cerrar la ventana
        />
      </div>
    </section>
  );
};

export default ListPerfiles;