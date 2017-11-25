import axios from 'axios'

export const register=(data)=>{
  return dispatch=>{
      axios.post("http://localhost:3000/register",data)
      .then(result=>{
        dispatch(registerUserSuccess(result))  
        console.log('result',result.data);
      })
      
    }
}

export const registerUserSuccess=(result)=>{
  return {
    type:'REGISTER_SUCCESS',
    data:result
  }
}