import { useState } from "react";
import { FaUserPlus } from "react-icons/fa"; // Ícono de agregar persona
import { MdFileUpload } from "react-icons/md"; // Ícono de subir archivo
import "./listaPerfiles.css";
import CreateProfilePopup from "../CrearPerfil/crearperfil"; // Modificado a crear perfil
import CrearPosts from "../CrearPosts/crearposts"; // Asegúrate de importar el popup de crear publicación
import { useGetallCreators } from "../../Hooks/UseQuerys";
import { SkeletonUserList } from "./SkeletonPerfiles/skeleton";
import { Search } from "../Buscador/buscador";


export const ListPerfiles = () => {
  const { data, loading, error } = useGetallCreators();
  const [modalImagen, setModalImagen] = useState<string | null>(null);
  const [isCreateProfileOpen, setIsCreateProfileOpen] = useState(false); // Estado para controlar la ventana emergente de crear perfil
  const [isCrearPostOpen, setIsCrearPostOpen] = useState(false); // Nuevo estado para controlar la ventana emergente de crear publicación
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const openModal = (imagen: string) => {
    setModalImagen(imagen);
  };

  const closeModal = () => {
    setModalImagen(null);
  };

  const handleAddPerson = () => {
    setIsCreateProfileOpen(true); // Abre el popup para crear perfil
  };

  const handleUploadFile = (userId: string) => {
    setSelectedUserId(userId);
    setIsCrearPostOpen(true); // Abre el popup para crear publicación
  };

  const handleCloseCreateProfile = () => {
    setIsCreateProfileOpen(false); // Cierra el popup de crear perfil
  };

  const handleCloseCrearPost = () => {
    setIsCrearPostOpen(false); // Cierra el popup de crear publicación
  };

  if (loading) return <SkeletonUserList/>;
  if (error) return <p>error: {error.message}</p>;

  return (
    <section className="profile-list-background">
      <div className="profile-list-container">
        <Search/>
        <div className="profile-list">
          {data?.AllUsersWithCountsCreator.map((perfil: any) => (
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
              <button
                className="upload-button"
                onClick={() => handleUploadFile(perfil.user_id)}
              >
                <MdFileUpload size={24} />
              </button>
            </div>
          ))}
        </div>

        {modalImagen && (
          <div className="modal" onClick={closeModal}>
            <img src={modalImagen} className="modal-content" alt="Ampliada" />
          </div>
        )}

        {/* Botón flotante para agregar perfil */}
        <button className="floating-button" onClick={handleAddPerson}>
          <FaUserPlus size={24} />
        </button>

        {/* Ventana emergente para crear perfil */}
        <CreateProfilePopup
          isOpen={isCreateProfileOpen}
          onClose={handleCloseCreateProfile}
        />

        {/* Ventana emergente para crear publicación */}
        <CrearPosts
          userId={selectedUserId}
          isOpen={isCrearPostOpen}
          onClose={handleCloseCrearPost}
        />
      </div>
    </section>
  );
};

export default ListPerfiles;
