import { PerfilUser } from "../Components/PerfilUser/perfiluser";
import { Sidebar } from "../Components/Sidebar/sidebar";
import { Feed } from "../Components/inicio/inicio";

export function Inicio () {
    return (
        <>
        <div className="container">
        <Sidebar/>
        <Feed/>
        <PerfilUser/>
        </div>
        </>
        
    )
}