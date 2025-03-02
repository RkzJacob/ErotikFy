import { Control, Controller, FieldError } from "react-hook-form";


interface Props {
    name:string;
    control: Control<any>;
    label: string;
    type?: string;
    error?:FieldError;
}

export const InputFormPost = ({name,label,control,type,error}:Props) =>{
    return(       
                        <Controller 
                        name={name}
                        control={control}
                        render={({field}) => <input id={name} type={type} {...field} 
                        onChange={(e) => {
                            if (type === "file" && e.target.files) {
                              // Si es un input de tipo "file", actualiza el campo con los archivos seleccionados
                              const files = Array.from(e.target.files); // Convierte FileList a un array
                              field.onChange(files); // Actualiza el valor en react-hook-form
                            } else {
                              // Para otros tipos de input, actualiza el campo normalmente
                              field.onChange(e.target.value);
                            }
                          }}
                          multiple={type === "file"} // Permite múltiples archivos si el tipo es "file"
                          accept={type === "file" ? "image/*, video/*" : undefined}
                        placeholder={label} className={`register__item-input ${error ? "is-invalid" : "valid" }`} />}
                        />
    )

}