import './login.css'
import { useState } from "react";
import { Link } from "react-router-dom"
import background from '../../assets/erotikfy.jpg'


export const Login = () => {
    const [nombreUsuario,setNombreUsuario] = useState('');
    const [contrasena,setContrasena] = useState('');
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
                <form className="login__form" /*onSubmit={handleSubmit}*/>
                    <div className='login__item'>
                        <input type="text" placeholder='Nombre de usuario' className='login__item-input'name='nombre_usuario' required value={nombreUsuario} onChange={(e)=> setNombreUsuario(e.target.value)}/>
                    </div>
                    <div className='login__item'>
                        <input type="password" className='login__item-input' placeholder='Contraseña' name='contrasena' required value={contrasena} onChange={(e)=> setContrasena(e.target.value)}/>
                    </div>
                    <div className="login__item">
                      <ul className='login__item list'>
                        <li><Link to={'/Registrar-cuenta'} className='login__recuperar'>Registrar cuenta</Link></li>
                      </ul>
                    </div>
                    <button className='login__button' type='submit' >
                        Iniciar sesion
                    </button>
                </form> 
            </div>
        </section>
        </>
    )
}