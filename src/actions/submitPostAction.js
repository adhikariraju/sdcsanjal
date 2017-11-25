import React from 'react'
import data from '../config.json'
import axios from 'axios'
export const submitPostAction=(data)=>{
//   console.log("submit post",data.submitPost)
    // let url=`http://${data.host}:${data.port}/${data.submitPost}`
    let url=`http://localhost:3000/post`
    console.log("url",url)
    return dispatch=>{axios.post(url,data)
    .then(result=>dispatch(postActionSuccess(result.data)))
    .catch(error=>dispatch(postActionFailure(error)))    
}
}

export const postActionSuccess=(result)=>{
    return{
        type:'POST_ACTION_SUCCESS',
        result
    }
}

export const postActionFailure=(error)=>{
    return{
        type:'POST_ACTION_FAILURE',
        error
    }
}