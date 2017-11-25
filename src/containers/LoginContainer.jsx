import {connect} from 'react-redux'
import Login from '../components/Login'
import {doLogin} from '../actions/doLoginAction'
import {saveUserDetails} from '../actions/saveUserDetails'

const mapStateToProps=(state)=>{
    return{
        loginStatus:state.loginReducer.status,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        doLogin:(username,password)=>dispatch(doLogin(username,password)),
        saveUserDetails:(id)=>dispatch(saveUserDetails(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);