
import "./listaUsuarios.css";
import { useGetallCreators, useGetallNormals } from "../../Hooks/UseQuerys";

export const ListUsuarios = () => {
  const { data, loading, error } = useGetallNormals();


  if (loading) return <p>loading...</p>;
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
              >
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListUsuarios;
