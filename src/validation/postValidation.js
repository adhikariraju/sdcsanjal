export const validate = values =>{
    const errors={}
    const requiredFields=["Title","Question","Tags"]
    requiredFields.forEach(field=>{
        if(!values[field]){
            errors[field]=`${field} field is Required`
        }
    })
    return errors;
}
