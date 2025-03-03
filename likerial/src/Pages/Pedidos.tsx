import { PedidosList } from "../Components/Pedidos/pedidos";
import { PerfilUser } from "../Components/PerfilUser/perfiluser";
import { Sidebar } from "../Components/Sidebar/sidebar";

export function Pedidos(){
    return(
        <>
        <div className="container">
            <Sidebar/>
            <PedidosList/>
            <PerfilUser/>
        </div>
        </>
    )
}