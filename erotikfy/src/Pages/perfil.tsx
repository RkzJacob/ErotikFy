import { PerfilList } from "../Components/perfil/perfil";
import { PerfilUser } from "../Components/PerfilUser/perfiluser";
import { Sidebar } from "../Components/Sidebar/sidebar";

export function Perfil () {
    return (
        <>
        <div className="container">
        <Sidebar/>
        <PerfilList/>
        </div>
        </>
        
    )
}