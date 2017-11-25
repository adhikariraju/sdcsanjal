const initialState={
    status:'',
    userList:[]
}

export const userListReducer=(state=initialState,action)=>{
  switch(action.type){
      case 'GET_USERS_SUCCESS':
        return {...state,userList:[...action.result]}
      
      default:
        return state;  
    }
}