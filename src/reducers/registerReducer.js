const initialState={
    status:'',
    message:''
}

export const registerReducer=(state=initialState,action)=>{
  switch(action.type){
      case 'REGISTER_SUCCESS':
        return {...state,status:action.data}
      
      default:
        return state;  
    }
}