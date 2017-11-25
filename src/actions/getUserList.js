import React from 'react'
import data from '../config.json'
import axios from 'axios'
export const getUserList=(data)=>{
//   console.log("submit post",data.submitPost)
    // let url=`http://${data.host}:${data.port}/${data.submitPost}`
    let url=`http://localhost:3000/userlist`
    console.log("url",url)
    return dispatch=>{axios.post(url,data)
    .then(result=>{
            console.log("result",result);
            dispatch(getUserListSuccess(result.data))
        })
    .catch(error=>dispatch(getUserListFailure(error)))    
}
}

export const lgetUserListSuccess=(result)=>{
    return{
        type:'GET_USERS_SUCCESS',
        result
    }
}

export const getUserListFailure=(error)=>{
    return{
        type:'GET_USERS_FAILURE',
        error
    }
}