import React from 'react'
import data from '../config.json'
import axios from 'axios'
export const getPostAction=()=>{
//   console.log("submit post",data.submitPost)
    // let url=`http://${data.host}:${data.port}/${data.submitPost}`
    let url=`http://localhost:3000/post`
    console.log("url",url)
    return dispatch=>{axios.get(url)
    .then(result=>{console.log("result ",result)
          dispatch(getPostActionSuccess(result.data))})
    .catch(error=>dispatch(getPostActionFailure(error)))    
}
}

export const getPostActionSuccess=(result)=>{
    return{
        type:'GET_POST_ACTION_SUCCESS',
        result
    }
}

export const getPostActionFailure=(error)=>{
    return{
        type:'GET_POST_ACTION_FAILURE',
        error
    }
}