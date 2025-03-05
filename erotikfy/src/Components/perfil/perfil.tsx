import './perfil.css';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGET_INFO_CREATOR } from '../../Hooks/UseQuerys';
import { SkeletonUserList } from '../ListaPerfiles/SkeletonPerfiles/skeleton';

export const PerfilList = () => {
    const {user_id} = useParams<{ user_id: string }>();
    const idpeli:string = user_id || "";

    console.log("EL VALOR DE USER_ID ES ",user_id)
    const {data,loading,error} = useGET_INFO_CREATOR(idpeli);

    console.log("INFORMACION PERFIL: ",data)

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

    if (loading) {
        return <SkeletonUserList/>;
    }

    if (error) {
        return <p>Error al cargar el perfil: {error.message}</p>;
    }

    console.log(data);

    return (
        <section className="tumadre">
            <div className="profile-info-container">
                <div className="profile-header">
                    {/* Contenedor para la foto y el nombre */}
                    <div className="profile-left">
                        <img
                            src={data?.getOneFindUserID.profile_picture || profilePic}
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
                        <h2 className="username">{data?.getOneFindUserID.username}</h2>
                    </div>

                    {/* Descripción del perfil */}
                    <div className="profile-description">
                        <p>
                            {data?.getOneFindUserID.bio}
                        </p>
                    </div>
                </div>
            </div>

            <div className="posts-grid">
                {data?.getOneFindUserID.posts?.map((post, index) => {
                    const mediaArray = JSON.parse(post.media);
                    return(
                    
                        <div
                            key={index}
                            className="post-container"
                            onClick={() => openModal(mediaArray[0])} // El evento onClick está en el contenedor
                        >
                            <img src={mediaArray[0]} alt="Publicación" className="post" />
                        </div>
                    );
                })}
                
            </div>

            {modalImage && (
                <div className="modal" onClick={closeModal}>
                    <img src={modalImage} className="modal-content" alt="Ampliada" />
                </div>
            )}
        </section>
    );
};