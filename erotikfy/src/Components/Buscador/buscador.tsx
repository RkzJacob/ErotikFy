
import { useState } from 'react';
import './buscador.css';
import { useGetCreators } from '../../Hooks/UseQuerys';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, error, data } = useGetCreators(searchTerm);

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar usuario..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <ul className="search-results">
          {loading && <li>Cargando...</li>}
          {error && <li>Error al cargar los resultados</li>}
          {data?.FILTRAR_USUARIOS ? (
            // Si FILTRAR_USUARIOS tiene algún valor, mapeamos los resultados
            data.FILTRAR_USUARIOS.map((user, index) => (
              <li key={index} className="search-item">
                {user.username} {/* Muestra el nombre de usuario */}
              </li>
            ))
          ) : (
            // Si no hay resultados, mostramos un mensaje de "No se encontraron resultados"
            <li className="search-item no-results">No se encontraron resultados</li>
          )}
        </ul>
      )}
    </div>
  );
};
