import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { JSX } from "react";

export const PrivateRoute = ({ children }: {children: JSX.Element})=>{
    const token = Cookies.get("token");

    if(!token){
        return <Navigate to="/Main" />;
    }
    return children
}