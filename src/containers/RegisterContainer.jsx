import {connect} from 'react-redux'
import Register from '../components/Register'
import {register} from '../actions/registerAction.js'

const mapStateToProps=(state)=>{
   return{
       registerResponse:state.registerReducer.status
   }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        register:(values)=>dispatch(register(values))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);