import './register.css'
import {z} from "zod"
import {  SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputForm } from './inputsForm';
import background from '../../assets/register_realike.jpg'
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION_USERNORMAL } from '../../Mutations/mutations';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


const schema = z.object({
    nombre_usuario: z.string().min(1,"El nombre se usuario es obligatorio"),
    contrasena: z.string().min(6,"La contraseña debe contener almenos 6 caracteres"),
    confirmPassword: z.string().min(6,"La confirmacion debe tener almenos 6 caracteres")
}).refine(data=>data.contrasena === data.confirmPassword,{
    message: "Las contraseñas son Inválidas",
    path: ['confirmPassword']
})

type FormValues = z.infer<typeof schema>;

export const Registrar = () =>{
    const [createUser,{loading}] = useMutation(REGISTER_MUTATION_USERNORMAL);
    const navigate = useNavigate();
    const {control,handleSubmit,formState:{errors}} = useForm<FormValues>({
        resolver:zodResolver(schema),
        mode:"onBlur",
        defaultValues:{
            nombre_usuario:"",
            contrasena:"",
            confirmPassword:""
        }
    });

    const onSubmit: SubmitHandler<FormValues> = async (formData) =>{
        try {
            await createUser({
                variables: {username: formData.nombre_usuario,contrasena:formData.confirmPassword },
              });
            toast.success(`Haz registrado tu cuenta con exito ${formData.nombre_usuario}`)
            navigate('/loguear-cuenta')
        } catch (error) {
            toast.error(`no se ha podido registrar con exito ${error}`)
        }
    }
    return (
        <section className="register">
            <div className="content-register">
                <div className='imagen-register'>
                    <img src={background} alt="Login-imagen" />
                </div>

            </div>
            <div className="register__container">
                <div className='register_container-title'>
                    <h2>REGISTRAR CUENTA</h2>
                </div>
                    <form className="register__form" onSubmit={handleSubmit(onSubmit)}  >
                        <div>
                            <i className="fa fa-user"></i>
                            <InputForm name='nombre_usuario' control={control} label='Nombre de usuario' type='string' error={errors.nombre_usuario}/>
                        </div>
                        <div>
                            <i className="fa fa-lock"></i>
                            <InputForm name='contrasena' control={control} label='Contraseña' type='password' error={errors.contrasena}/>
                        </div>
                        <div>
                            <i className="fa fa-lock"></i>
                            <InputForm name='confirmPassword' control={control} label='Confirmar contraseña' type='password' error={errors.confirmPassword}/>
                        </div>
                        <button className='register__button' type='submit'  disabled={loading}>
                            Registrarse
                        </button>
                    </form> 
                </div>
                
        </section>
    )
}