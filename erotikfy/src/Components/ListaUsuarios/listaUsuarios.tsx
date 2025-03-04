
import "./listaUsuarios.css";
import { useGetallCreators } from "../../Hooks/UseQuerys";

export const ListPerfiles = () => {
  const { data, loading, error } = useGetallCreators();


  if (loading) return <p>loading...</p>;
  if (error) return <p>error: {error.message}</p>;

  return (
    <section className="profile-list-background">
      <div className="profile-list-container">
        <div className="profile-list">
          {data?.AllUsersWithCounts.map((perfil: any) => (
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

export default ListPerfiles;
