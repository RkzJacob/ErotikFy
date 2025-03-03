import { ListPerfiles } from "../Components/ListaPerfiles/listaPerfiles";
import { Sidebar } from "../Components/Sidebar/sidebar";

export function ListaPerfiles () {
    return (
        <>
        <div className="container">
            <Sidebar/>
            <ListPerfiles/>
        </div>
        </>
        
    )
}