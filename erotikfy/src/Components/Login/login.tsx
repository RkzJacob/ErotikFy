import './login.css'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import background from '../../assets/erotikfy.jpg'
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../Mutations/mutations';
import { toast } from 'sonner';
import Cookies from "js-cookie";


export const Login = () => {
    const [nombreUsuario,setNombreUsuario] = useState('');
    const [contrasena,setContrasena] = useState('');
    const [login,{loading}] = useMutation(LOGIN_MUTATION);
    const client = useApolloClient();
    const navigate = useNavigate();
    const [role, setRole] = useState<string | null>(null);
    

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        
        try {
          const {data}=await login({
            variables: {username: nombreUsuario, contrasena:contrasena },
          });
          
          if (data?.login) {
            // Actualizar el cache de Apollo con el nombre del usuario
            client.writeQuery({
              query: gql`
                query GetUserName {
                  user {
                    nombre_usuario
                  }
                }
              `,
              data: {
                user: {
                  nombre_usuario: nombreUsuario,
                  __typename: 'User',  // Especificar un typename
                },
              },
            });
          }

          
          localStorage.setItem("nombre_usuario", nombreUsuario);
          toast.success(`Haz accedido con exito ${nombreUsuario}`)
          
          setTimeout(() => {
            const updatedRole = (Cookies.get("role") || "").trim().toLowerCase();
            setRole(updatedRole);
            
            console.log("Rol obtenido:", updatedRole);

            if (updatedRole === "suscriptor" || updatedRole === "admin") {
                navigate("/inicio");
            } else if (updatedRole === "normal") {
                navigate("/main");
            } else {
                console.warn("Rol no reconocido:", updatedRole);
            }
        }, 700);

        } catch (err) {
          toast.error(`No haz podido ingresar contraseña o nombre de usuario invalido`)
        }
      };


    
    return (
        <>
        <section className="login">
            <div className="login-content">
                <img src= {background} className='login__img banner'alt="" />
            </div>
            <div className="login__container">
                <div className='login__header'>
                    <h2>Iniciar Sesion</h2>
                    <p>Ingresa tu nombre de usuario y la contraseña para acceder a erotkfy</p>
                </div>
                <form className="login__form" onSubmit={handleSubmit}>
                    <div className='login__item'>
                        <input type="text" placeholder='Nombre de usuario' className='login__item-input'name='nombre_usuario' required value={nombreUsuario} onChange={(e)=> setNombreUsuario(e.target.value)}/>
                    </div>
                    <div className='login__item'>
                        <input type="password" className='login__item-input' placeholder='Contraseña' name='contrasena' required value={contrasena} onChange={(e)=> setContrasena(e.target.value)}/>
                    </div>
                    <div className="login__item">
                      <ul className='login__item list'>
                        <li><Link to={'/registrar-cuenta'} className='login__recuperar'>Registrar cuenta</Link></li>
                      </ul>
                    </div>
                    <button className='login__button' type='submit' disabled={loading}>
                        Iniciar sesion
                    </button>
                </form> 
            </div>
        </section>
        </>
    )
}