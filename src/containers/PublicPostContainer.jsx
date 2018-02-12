import Post from '../components/PublicPost'
import {getPostAction} from '../actions/getPostAction'
import {connect} from 'react-redux'

const mapStateToProps=(state)=>{
    console.log("postReducer",state.postReducer)
  return{
    postDetail:state.postReducer.getPost.postList,
    userDetails:state.userDetail.details
  }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        getPost:()=>dispatch(getPostAction())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Post);