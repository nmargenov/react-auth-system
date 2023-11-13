import { useState } from "react"

export const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    function onInputChange(e){
        setValues(state=>({...state,[e.target.name]:e.target.value}));
    } 

    return{
        values,
        onInputChange
    }
}