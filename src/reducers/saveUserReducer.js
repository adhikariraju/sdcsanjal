const initialState={
    details:''
}

export const saveUserReducer=(state=initialState,action)=>{
  switch(action.type){
      case 'SAVE_USER_DETAILS':
        return {...state,details:action.details}
      
      default:
        return state;  
    }
}