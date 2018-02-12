import TextField from  'material-ui/TextField'
import React from 'react';
import {teal400} from 'material-ui/styles/colors';


 const Text=({
    input,
    label,
    meta:{touched,error},
    ...custom
})=>{
  console.log("input",input)
  return (<TextField
   floatingLabelFixed={label}
   floatingLabelText={label}
   floatingLabelStyle={{fontSize:"22px",fontWeight:"bold",color:teal400}}
  //  floatingLabelFocusStyle={{color:"#26A69A"}}
   style={{marginBottom:'10px'}}
  
   errorText={touched && error}
   {...input}
   {...custom}
   >
   </TextField>)}
export default Text;