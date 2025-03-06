import { Navigate } from "react-router-dom";
import { JSX } from "react";

export const PrivateRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole: string[] }) => {
  const token = localStorage.getItem("token");

  // Si el token no existe, redirige a la página de login
  if (!token) {
    return <Navigate to="/loguear-cuenta" />;
  }

  // Aquí asumimos que el rol está dentro del token
  const role = localStorage.getItem("role") || ""; // Decodificar el token (suponiendo que es JWT)


  // Verificamos si el usuario tiene el rol adecuado
  if (!requiredRole.includes(role)) {
    return <Navigate to="/" />;  // Si no tiene el rol adecuado, redirigir a otra página
  }

  return children; // Si el rol es adecuado, mostrar el contenido
};