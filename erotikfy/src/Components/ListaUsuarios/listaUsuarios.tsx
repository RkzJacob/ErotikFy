import "./listaUsuarios.css";
import { useGetallNormals } from "../../Hooks/UseQuerys";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa"; // Estrella llena (suscriptor)
import { CiStar } from "react-icons/ci"; // Estrella vacía (normal)
import { SkeletonUserList } from "../ListaPerfiles/SkeletonPerfiles/skeleton";
import { useMutation } from "@apollo/client";
import { HACER_NORMAL, HACER_SUSCRIPTOR } from "../../Mutations/mutations";
import { toast } from "sonner";

export const ListUsuarios = () => {
  const { data, loading, error } = useGetallNormals();
  const [hacerSuscriptor] = useMutation(HACER_SUSCRIPTOR);
  const [hacerNormal] = useMutation(HACER_NORMAL);
  const [starredUsers, setStarredUsers] = useState<{ [key: string]: boolean }>({});

  // Cargar los datos al estado cuando se obtiene la respuesta
  useEffect(() => {
    if (data?.AllUsersWithCountsNormales) {
      const initialState: { [key: string]: boolean } = {};
      data.AllUsersWithCountsNormales.forEach((perfil: any) => {
        initialState[perfil.user_id] = perfil.role === "suscriptor";
      });
      setStarredUsers(initialState);
    }
  }, [data]);

  // Función para alternar entre suscriptor y normal
  const toggleStar = async (userId: string) => {
    const esSuscriptor = starredUsers[userId]; // Estado actual

    try {
      if (esSuscriptor) {
        // Si es suscriptor, hacer normal
        await hacerNormal({ variables: { user_id: userId } });

        setStarredUsers((prev) => ({
          ...prev,
          [userId]: false, // Ahora es usuario normal
        }));

        toast.info(`El usuario ${userId} ahora es normal`);
      } else {
        // Si es normal, hacer suscriptor
        await hacerSuscriptor({ variables: { user_id: userId } });

        setStarredUsers((prev) => ({
          ...prev,
          [userId]: true, // Ahora es suscriptor
        }));

        toast.success(`El usuario ${userId} ahora es suscriptor`);
      }
    } catch (error) {
      toast.error(`No se pudo actualizar el usuario: ${error}`);
    }
  };

  if (loading) return <SkeletonUserList />;
  if (error) return <p>Error: {error.message}</p>;

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
                className="star-button"
                onClick={() => toggleStar(perfil.user_id)}
              >
                {starredUsers[perfil.user_id] ? (
                  <FaStar className="star-icon filled" /> // Si es suscriptor, estrella llena
                ) : (
                  <CiStar className="star-icon" /> // Si no es suscriptor, estrella vacía
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