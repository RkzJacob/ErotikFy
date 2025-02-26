import React, { useRef, useState } from "react";
import "./listaPerfiles.css"; // Importa el archivo CSS que proporcionaste

interface Perfil {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

export const ListPerfiles = () => {
  const [perfiles] = useState<Perfil[]>([
    {
      id: 1,
      nombre: "Valeria",
      descripcion:
        "Crea contenido de entretenimiento sensual y atractivo. Su estilo único ha atraído a miles de seguidores.",
      imagen: "img/profile1.jpg",
    },
    {
      id: 2,
      nombre: "Carlos",
      descripcion:
        "Amante de la tecnología y los videojuegos. Comparte reseñas y tutoriales para la comunidad gamer.",
      imagen: "img/profile2.jpg",
    },
    {
      id: 3,
      nombre: "Ana",
      descripcion:
        "Especialista en moda y lifestyle. Inspira a sus seguidores con looks únicos y consejos de estilo.",
      imagen: "img/profile3.jpg",
    },
  ]);

  const [modalImagen, setModalImagen] = useState<string | null>(null);

  const openModal = (imagen: string) => {
    setModalImagen(imagen);
  };

  const closeModal = () => {
    setModalImagen(null);
  };

  return (
    <section className="profile-list-background">
      <div className="profile-list-container">
        {/* Cuadro de información */}
        <div className="profile-list-info-container">
          <div className="profile-list-header">
            <h1 className="profile-list-title">Lista de Creadores</h1>
          </div>
        </div>

        {/* Lista de perfiles */}
        <div className="profile-list">
          {perfiles.map((perfil) => (
            <div key={perfil.id} className="profile-list-item">
              <img
                src={perfil.imagen}
                alt={`Foto de perfil de ${perfil.nombre}`}
                className="profile-list-image"
                onClick={() => openModal(perfil.imagen)}
              />
              <div className="profile-list-info">
                <h3 className="profile-list-name">{perfil.nombre}</h3>
                <p className="profile-list-description">{perfil.descripcion}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal para mostrar la imagen en grande */}
        {modalImagen && (
          <div className="modal" onClick={closeModal}>
            <img src={modalImagen} className="modal-content" alt="Ampliada" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ListPerfiles;