import { ListUsuarios } from "../Components/ListaUsuarios/listaUsuarios";
import { Sidebar } from "../Components/Sidebar/sidebar";

export function ListaUsuarios () {
    return (
        <>
        <div className="container">
            <Sidebar/>
            <ListUsuarios/>
        </div>
        </>
        
    )
}