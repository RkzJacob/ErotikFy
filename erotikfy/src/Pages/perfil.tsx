import { PerfilList } from "../Components/perfil/perfil";
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