import { Search } from "../Components/Buscador/buscador";
import { Sidebar } from "../Components/Sidebar/sidebar";

export function BuscadorInteligente(){
    return(
        <>
        <div className="container">
            <Sidebar/>
            <Search/>
        </div>
        </>
    )
}