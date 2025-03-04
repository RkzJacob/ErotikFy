import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { JSX } from "react";

export const PrivateRoute = ({ children }: {children: JSX.Element})=>{
    const token = Cookies.get("token");
    console.log(token);

    if(!token){
        return <Navigate to="/loguear-cuenta" />;
    }
    return children
}