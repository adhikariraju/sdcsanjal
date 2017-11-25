import React,{Component} from 'react'
import TextField from 'material-ui/TextField'
import {Link,Redirect,history,router} from 'react-router-dom';

import {Field,reduxForm} from 'redux-form'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {validate} from "../validation/loginValidation"
import Text from './form-controls/Text'
import {teal400} from 'material-ui/styles/colors';
import DialogBox from './DialogBox'

class Login extends Component{
constructor(props){
    super(props);
    this.state={
        loginDetails:undefined
    }
}
    login(values){
        let username=values.username;
        let password=values.password;
        
        let loginData={username,password};
        
        this.props.doLogin(loginData);        
    }

    componentWillReceiveProps(nextProps){
        console.log("nextprops",nextProps)
         if(nextProps.loginStatus!=""){          
            if(nextProps.loginStatus.isValidInput){
                this.props.saveUserDetails(nextProps.loginStatus);
                this.props.history.push('/dashboard');
            }
             
            else{
               this.dialogOpen=true;
               this.dialog={
                    "title":"Login Failed",
                    "content":"Invalid Username or Password"
                }
            }
        }       
    }
    signUp(){ 
        console.log("signup")
       this.props.history.push('/register');
    }
      
    render(){
        this.dialogOpen;
        this.dialog;
        const styles={
            paperStyle:{
            height:350,
            width:400,  
            margin:'auto',            
            padding:'10',
            paddingLeft:"0px"
            },
            mainContainer:{
              height:350,
              width:400,  
              margin:'auto',            
              marginTop:"25px"
            },
            textbox:{
            margin:20
            }
        }


       const { handleSubmit, pristine, reset, submitting } = this.props
        return(
         <div>   
             <div style={styles.mainContainer}>       
             <RaisedButton label="Sign UP" secondary={true} onClick={()=>this.signUp()}/>
             
              <Paper style={styles.paperStyle}>
                <div style={{marginLeft:"0px",borderLeft:"6px solid #339966"}}>
                  <h2 style={{marginLeft:"15px"}}>Login </h2>
                </div> 
               <div style={{display:'flex'}}>
                    <form onSubmit={handleSubmit(this.login.bind(this))} style={{margin:"auto"}}>
                       <div>
                          <div>                           
                            <Field name="username" label="Username" type="text" component={Text}/>
                            </div>
                            <div>
                            <Field name="password" label="Password" type="password" component={Text}/>
                            </div>
                            <RaisedButton label="Login" style={{ marginTop:'30'}} primary={true} type="submit"/>
                        </div>
                    </form>
                </div>
              </Paper>  
            </div>
            {this.dialogOpen&&<DialogBox dialog={this.dialog}/>}
         </div>

        )
    }
}

export default reduxForm({
    form:'Login',
    validate
})(Login);