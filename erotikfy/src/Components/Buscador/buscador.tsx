import { useState } from 'react';
import './buscador.css'
import { useGetCreators } from '../../Hooks/UseQuerys';

interface SearchProps {
  setSearchResults: (results: any[]) => void;
}

export const Search = ({ setSearchResults }: SearchProps) =>{
    const [searchTerm, setSearchTerm] = useState("");

    const { loading, error, data } = useGetCreators(searchTerm);
    const filteredData = data?.FILTRAR_USUARIOS || [];

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      setSearchResults(term ? filteredData : []); // Si hay término, actualizar resultados, si no, limpiar
    };

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
              {filteredData.length > 0 ? (
                filteredData.map((user, index) => (
                  <li key={index} className="search-item">
                    {user.username} {/* Muestra el nombre de usuario */}
                  </li>
                ))
              ) : (
                <li className="search-item no-results">No se encontraron resultados</li>
              )}
            </ul>
          )}
        </div>
      );
}

