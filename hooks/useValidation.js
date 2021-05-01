import React,{useState,useEffect} from 'react';


const useValidation = (initialState, validate,fn) => {

    const [values, saveValues] = useState(initialState);
    const [errors, saveErrors] = useState({});
    const [submitForm, saveSubmitForm] = useState(false);

    useEffect(() => {
        
        if(submitForm){
            const notErrors = Object.keys(errors).length === 0;
            if(notErrors) fn();
            saveSubmitForm(false);
        }
        
    }, []);

    //se ejecuta cuando el usuario escribe
    const handleChange = e =>{
        saveValues({
            ...values,
            [e.target.name] : e.target.value
        });
    }
    //Se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const errorsValidate = validate(values);
        saveErrors(errorsValidate);
        saveSubmitForm(true);
    }
    return {
        values,
        errors,
        submitForm,
        handleSubmit,
        handleChange
    }
}

export default useValidation