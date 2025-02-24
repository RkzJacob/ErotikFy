import './perfil.css';
import img1 from '../../LocalImagen/img1.jpg' 
import img2 from '../../LocalImagen/img2.jpg' 
import img3 from '../../LocalImagen/img3.jpg' 
import img4 from '../../LocalImagen/img4.jpg' 
import img5 from '../../LocalImagen/img5.jpg' 
import img6 from '../../LocalImagen/img6.jpg' 
import { useRef, useState } from 'react';


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
        const img = new Image();
        img.src = e.target.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
  
          const size = Math.min(img.width, img.height);
          canvas.width = size;
          canvas.height = size;
  
          ctx.drawImage(
            img,
            (img.width - size) / 2,
            (img.height - size) / 2,
            size,
            size,
            0,
            0,
            size,
            size
          );
  
          setProfilePic(canvas.toDataURL("image/png"));
        };
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
        <section className='tumadre'>
        <div className="profile-info-container">
          <div className="profile-header">
            <img
              src={profilePic}
              alt="Foto de perfil"
              className="profile-pic"
              onClick={handleProfileClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <div className="profile-info">
              <h2 className="username">Valeria</h2>
              <button className="follow-btn">Seguir</button>
            </div>
          </div>
          <div className="profile-description">
            <p>
              Valeria crea contenido de entretenimiento sensual y atractivo,
              dirigido a quienes buscan una forma diferente y atractiva de conexión.
              Su estilo único y su enfoque creativo han atraído a miles de seguidores.
            </p>
          </div>
        </div>
  
        <div className="posts-grid">
          {[img1, img2, img3, img4, img5, img6].map((src, index) => (
            <img key={index} src={src} alt="Publicación" className="post" onClick={() => openModal(src)} />
          ))}
        </div>
  
        {modalImage && (
          <div className="modal" onClick={closeModal}>
            <img src={modalImage} className="modal-content" alt="Ampliada" />
          </div>
        )}
  
        <a href="#top" className="back-to-top" title="Volver al inicio">
          <i className="fas fa-arrow-up"></i>
        </a>
  
        <a href="index.html" className="back-to-home">
          <i className="fas fa-arrow-left"></i>
        </a>
        </section>
    );
  };
