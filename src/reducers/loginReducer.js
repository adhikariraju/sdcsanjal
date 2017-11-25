const initialState={
    status:'',
    message:''
}

export const loginReducer=(state=initialState,action)=>{
  switch(action.type){
      case 'LOGIN_ACTION_SUCCESS':
        return {...state,status:action.result}
      
      case 'LOGIN_ACTION_FAILURE':
        return {...state,status:action.error}    
      
      default:
        return state;  
    }
}