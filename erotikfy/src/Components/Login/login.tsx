import './login.css';
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import background from '../../assets/erotikfy.jpg';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../Mutations/mutations';
import { toast } from 'sonner';

export const Login = () => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [login, { loading }] = useMutation(LOGIN_MUTATION);
    const [redirectTo, setRedirectTo] = useState<string | null>(null);  // Nuevo estado para la redirección

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        try {
            const { data } = await login({
                variables: { username: nombreUsuario, contrasena: contrasena },
            });
            
            if (data) {
                localStorage.setItem("role", data.LOGIN_USER.role);
                localStorage.setItem("nombre_usuario", nombreUsuario);
                localStorage.setItem("token", data.LOGIN_USER.token);
                toast.success(`Haz accedido con exito ${nombreUsuario}`);
                
                const updatedRole = localStorage.getItem("role");
                console.log("Rol obtenido:", updatedRole);

                if (updatedRole === "suscriptor" || updatedRole === "admin") {
                    setRedirectTo("/Inicio");  // Cambiar el estado para redirigir
                } else if (updatedRole === "normal") {
                    setRedirectTo("/Main");  // Cambiar el estado para redirigir
                } else {
                    console.warn("Rol no reconocido:", updatedRole);
                }
            }
        } catch (err) {
            toast.error(`No haz podido ingresar contraseña o nombre de usuario invalido`);
        }
    };

    // Redirigir si el estado de redirección está definido
    if (redirectTo) {
        return <Navigate to={redirectTo} />;
    }

    return (
        <>
            <section className="login">
                <div className="login-content">
                    <img src={background} className='login__img banner' alt="" />
                </div>
                <div className="login__container">
                    <div className='login__header'>
                        <h2>Iniciar Sesion</h2>
                        <p>Ingresa tu nombre de usuario y la contraseña para acceder a erotkfy</p>
                    </div>
                    <form className="login__form" onSubmit={handleSubmit}>
                        <div className='login__item'>
                            <input
                                type="text"
                                placeholder='Nombre de usuario'
                                className='login__item-input'
                                name='nombre_usuario'
                                required
                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario(e.target.value)}
                            />
                        </div>
                        <div className='login__item'>
                            <input
                                type="password"
                                className='login__item-input'
                                placeholder='Contraseña'
                                name='contrasena'
                                required
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />
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
    );
};
