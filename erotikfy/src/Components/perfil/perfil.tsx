import './perfil.css';
import { useRef, useState } from 'react';

// Importa las imágenes
import img1 from '../../LocalImagen/img1.jpg';
import img2 from '../../LocalImagen/img2.jpg';
import img3 from '../../LocalImagen/img3.jpg';
import img4 from '../../LocalImagen/img4.jpg';
import img5 from '../../LocalImagen/img5.jpg';
import img6 from '../../LocalImagen/img6.jpg';
import img7 from '../../LocalImagen/profile.jpg';

export const PerfilList = () => {
    const [profilePic, setProfilePic] = useState("img/profile.png");
    const [modalImage, setModalImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleProfileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            if (!e.target?.result) return;
            setProfilePic(e.target.result as string);
        };
        reader.readAsDataURL(file);
    };

    const openModal = (imgSrc: string) => {
        setModalImage(imgSrc);
    };

    const closeModal = () => {
        setModalImage(null);
    };

    return (
        <section className="tumadre">
            <div className="profile-info-container">
                <div className="profile-header">
                    {/* Contenedor para la foto y el nombre */}
                    <div className="profile-left">
                        <img
                            src={profilePic}
                            alt="Foto de perfil"
                            className="profile-pics"
                            onClick={handleProfileClick}
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <h2 className="username">Valeria</h2>
                    </div>

                    {/* Descripción del perfil */}
                    <div className="profile-description">
                        <p>
                            Valeria crea contenido de entretenimiento sensual y atractivo,
                            dirigido a quienes buscan una forma diferente y atractiva de conexión.
                            Su estilo único y su enfoque creativo han atraído a miles de seguidores.
                        </p>
                    </div>
                </div>
            </div>

            <div className="posts-grid">
                {[img1, img2, img3, img4, img5, img6, img7].map((src, index) => (
                    <div
                        key={index}
                        className="post-container"
                        onClick={() => openModal(src)} // El evento onClick está en el contenedor
                    >
                        <img src={src} alt="Publicación" className="post" />
                    </div>
                ))}
            </div>

            {modalImage && (
                <div className="modal" onClick={closeModal}>
                    <img src={modalImage} className="modal-content" alt="Ampliada" />
                </div>
            )}
        </section>
    );
};