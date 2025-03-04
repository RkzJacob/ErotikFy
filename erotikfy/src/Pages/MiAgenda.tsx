// import { AgendaUser } from "../Components/AgendaUser/AgendaUser";
import { PerfilUser } from "../Components/PerfilUser/perfiluser";
import { Sidebar } from "../Components/Sidebar/sidebar";

export function MiAgenda(){
    return (
        <>
        <div className="container">
            <Sidebar/>
            {/* <AgendaUser/> */}
            <PerfilUser/>
        </div>
        </>
    )
}