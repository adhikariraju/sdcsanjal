export const validate = values =>{
    const errors={}
    const requiredFields=["fullname","email","password","userType"]
    requiredFields.forEach(field=>{
        if(!values[field]){
            errors[field]=`${field} field is Required`
        }
        if(field==='email'){
            if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[field]))
            errors['email']='Email is not valid';
        }
    })
    return errors;
}
