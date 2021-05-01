export default function loginValidate(values) {
    const errors = {};

    //validar el nombre del usuario
    if(!values.name){
        errors.name = 'El nombre es obligatorio';
    }

    if(!values.email){
        errors.email = 'El email es obligatorio';
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z][2,]$/i.test(values.email)){
        errors.email = 'Email no valido'
    }

    if(!values.password){
        errors.password = 'El password es obligatorio';
    }else if(values.password.length < 6) {
        errors.password = 'El password debe ser de almenos 6 caracteres';
    }
}