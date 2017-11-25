import React from 'react'
import data from '../config.json'
import axios from 'axios'
export const doLogin=(data)=>{
//   console.log("submit post",data.submitPost)
    // let url=`http://${data.host}:${data.port}/${data.submitPost}`
    let url=`http://localhost:3000/login`
    console.log("url",url)
    return dispatch=>{axios.post(url,data)
    .then(result=>{
            console.log("result",result);
            dispatch(loginActionSuccess(result.data))
        })
    .catch(error=>dispatch(loginActionFailure(error)))    
}
}

export const loginActionSuccess=(result)=>{
    return{
        type:'LOGIN_ACTION_SUCCESS',
        result
    }
}

export const loginActionFailure=(error)=>{
    return{
        type:'LOGIN_ACTION_FAILURE',
        error
    }
}