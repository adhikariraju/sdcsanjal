import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import React from 'react'

 const MultiSelect=({ 
    input,
    label,
    meta:{touched,error},
    children,
    option,
    ...custom
})=>(<SelectField floatingLabelText={label}
       errorText={touched && error}
       {...input}
       onChange={(event,index,value)=>input.onChange(value)}
       children={children}
       {...custom}>
     </SelectField>
);

export default MultiSelect;