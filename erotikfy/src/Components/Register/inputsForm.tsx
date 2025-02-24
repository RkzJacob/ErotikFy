import { Control, Controller, FieldError } from "react-hook-form";


interface Props {
    name:string;
    control: Control<any>;
    label: string;
    type?: string;
    error?:FieldError;
}

export const InputForm = ({name,label,control,type,error}:Props) =>{
    return(       
                        <Controller 
                        name={name}
                        control={control}
                        render={({field}) => <input id={name} type={type} {...field} placeholder={label} className={`register__item-input ${error ? "is-invalid" : "valid" }`} />}
                        />
    )

}