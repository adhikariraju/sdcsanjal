const initialState={
    createPost:{status:'',
    message:''},

    getPost:{
      postList:"",
      error:null
    }
}

export const postReducer=(state=initialState,action)=>{
  switch(action.type){
      case 'POST_ACTION_SUCCESS':
        return {...state,createPost:{status:action.result}}
      
      case 'POST_ACTION_FAILURE':
        return {...state,createPost:{status:action.error}}   
      
      case 'GET_POST_ACTION_SUCCESS':
        return {...state,getPost:{postList:action.result}}

      case 'GET_POST_ACTION_FAILURE':
        return {...state,getPost:{error:action.error}}
      
      default:
        return state;  
    }
}