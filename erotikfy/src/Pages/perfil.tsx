import { PerfilList } from "../Components/perfil/perfil";
import { Sidebar } from "../Components/Sidebar/sidebar";
import '../App.css'

export function Perfil () {
    return (
        <div className="container-sid">
            <Sidebar/>
            <PerfilList/>
        </div>

        
    )
}