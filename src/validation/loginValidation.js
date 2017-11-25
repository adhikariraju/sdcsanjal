export const validate = values =>{
    const errors={}
    const requiredFields=["username","password"]
    requiredFields.forEach(field=>{
        if(!values[field]){
            errors[field]=`${field.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })} field is required`
        }
    })
    return errors;
}
