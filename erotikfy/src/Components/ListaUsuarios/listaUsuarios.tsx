import "./listaUsuarios.css";
import {  useGetallNormals } from "../../Hooks/UseQuerys";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { SkeletonUserList } from "../ListaPerfiles/SkeletonPerfiles/skeleton";

export const ListUsuarios = () => {
  const { data, loading, error } = useGetallNormals();
  const [starredUsers, setStarredUsers] = useState<{ [key: string]: boolean }>({});

  const toggleStar = (userId: string) => {
    setStarredUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  if (loading) return <SkeletonUserList/>;
  if (error) return <p>error: {error.message}</p>;

  return (
    <section className="profile-list-background">
      <div className="profile-list-container">
        <div className="profile-list">
          {data?.AllUsersWithCountsNormales.map((perfil: any) => (
            <div key={perfil.user_id} className="profile-list-item">
              <div className="profile-list-info">
                <h3 className="profile-list-name">{perfil.username}</h3>
              </div>
              <button
                className="upload-button"
                onClick={() => toggleStar(perfil.user_id)}
              >
                {starredUsers[perfil.user_id] ? (
                  <FaStar className="star-icon filled" />
                ) : (
                  <CiStar className="star-icon" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListUsuarios;