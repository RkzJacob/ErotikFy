import { useState } from "react";
import { FaUserPlus } from "react-icons/fa"; // Ícono de agregar persona
import { MdFileUpload, MdDelete } from "react-icons/md"; // Íconos de subir archivo y eliminar
import "./listaPerfiles.css";
import CreateProfilePopup from "../CrearPerfil/crearperfil"; // Modificado a crear perfil
import CrearPosts from "../CrearPosts/crearposts"; // Asegúrate de importar el popup de crear publicación
import { useGetallCreators } from "../../Hooks/UseQuerys";
import { SkeletonUserList } from "./SkeletonPerfiles/skeleton";
import { Search } from "../Buscador/buscador";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { BORRAR_CREADOR } from "../../Mutations/mutations";
import { GET_ALL_CREATORS } from "../../Querys/querys";

export const ListPerfiles = () => {
  const { data, loading, error } = useGetallCreators();
  const [modalImagen, setModalImagen] = useState<string | null>(null);
  const [isCreateProfileOpen, setIsCreateProfileOpen] = useState(false); // Estado para controlar la ventana emergente de crear perfil
  const [isCrearPostOpen, setIsCrearPostOpen] = useState(false); // Nuevo estado para controlar la ventana emergente de crear publicación
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [borrarCreador] = useMutation(BORRAR_CREADOR,{refetchQueries:[{ query: GET_ALL_CREATORS }]});

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

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

  const handleDeleteProfile = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDeleteProfile = async () => {
    // Aquí puedes agregar tu lógica de eliminación con la mutación
    if (userToDelete) {
      try {
        await borrarCreador({
          variables: {user_id: userToDelete, 
          },
        });
      console.log("USUARIO eliminado: ",userToDelete)
      } catch (error) {
        console.log("error",error)
      }
    }
    // Cerrar la advertencia
    setIsDeleteConfirmationOpen(false);
  };

  const cancelDeleteProfile = () => {
    // Solo cerrar la advertencia sin hacer nada
    setIsDeleteConfirmationOpen(false);
  };

  

  if (loading) return <SkeletonUserList />;
  if (error) return <p>error: {error.message}</p>;

  return (
    <section className="creator-list-background">
      <div className="creator-list-container">
        <Search  />
        <div className="creator-list">
          {data?.AllUsersWithCountsCreator.map((perfil: any) => (
            <div key={perfil.user_id} className="creator-list-item">
              <img
                src={perfil.profile_picture}
                alt={`Foto de perfil de ${perfil.username}`}
                className="creator-list-image"
                onClick={() => openModal(perfil.profile_picture)}
              />
              <div className="creator-list-info">
                <h3 className="creator-list-name"><Link to={`/perfil/${perfil.user_id}`}>{perfil.username}</Link> </h3>
                <p className="creator-list-description">{perfil.bio}</p>
              </div>
              <div className="creator-list-actions">
                <button
                  className="delete-button"
                  onClick={() => handleDeleteProfile(perfil.user_id)}
                >
                  <MdDelete size={24} />
                </button>
                <button
                  className="upload-button"
                  onClick={() => handleUploadFile(perfil.user_id)}
                >
                  <MdFileUpload size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {isDeleteConfirmationOpen && (
          <div className="delete-confirmation-modal">
            <div className="delete-confirmation-content">
              <p>¿Estás seguro de que quieres eliminar este perfil?</p>
              <div className="delete-confirmation-buttons">
                <button onClick={confirmDeleteProfile}>Sí</button>
                <button onClick={cancelDeleteProfile}>No</button>
              </div>
            </div>
          </div>
        )}

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
