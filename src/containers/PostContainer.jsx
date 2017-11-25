import NewPost from '../components/newPost'
import {submitPostAction} from '../actions/submitPostAction'
import {connect} from 'react-redux'

// const mapStatesToProps=(state)=>{
//   return{

//   }
// }

const mapDispatchToProps=(dispatch)=>{
    return{
        submitPost:(postData)=>dispatch(submitPostAction(postData))
    }
}

export default connect(null,mapDispatchToProps)(NewPost);