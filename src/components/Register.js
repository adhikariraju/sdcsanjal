import React,{Component} from 'react'
import TextField from 'material-ui/TextField'
import {Field,reduxForm} from 'redux-form'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {validate} from "../validation/registerValidation"
import Text from './form-controls/Text'
import RadioGroup from './form-controls/RadioGroup'
import RadioButton from 'material-ui/RadioButton'
import {lime700} from 'material-ui/styles/colors'
import DialogBox from './DialogBox'


class Register extends Component{
     
    register(values){
        console.log("valiues",values)
        this.props.register(values);
    }
    
    login(){
        this.props.history.push('/')
    }

     componentWillReceiveProps(nextProps){
        console.log("nextprops",nextProps)
        if(nextProps.registerResponse){
            let userexist=nextProps.registerResponse.data.userExist;
            let isValidinput=nextProps.registerResponse.data.isValidInput;
                        
            if(userexist){
                this.dialogOpen=true;
                this.dialog={
                    "title":"Username already exist",
                    "content":"Username provided is already being used"
                }
            }
            
            else if(isValidinput){
                this.dialogOpen=true;
                this.dialog={
                    "title":"Registration Successfull",
                    "content":"Login to access your account"
                }
            }
        }
    }



    render(){

        this.dialogOpen;
        this.dialog;

        console.log("this.dialog",this.dialog)
        console.log("this.dialogopen",this.dialogOpen)
        const paperStyle={
            
        };
        const styles={
        paperStyle:{
            height:'auto',
            width:400,
            margin:'auto',
        
            alignContent:'center',
            padding:'10',
            paddingLeft:"0px"
            },
            mainContainer:{
              height:'auto',
              width:400,  
              margin:'auto',            
              marginTop:"25px"
            }}
        const radioButtonStyle={
            
        }
        const commonMargin={
            margin:"5px",
            fontSize:'19px'
            
        }

       

       const { handleSubmit, pristine, reset, submitting } = this.props
        return(
            <div>
             <div style={styles.mainContainer}>       
              <RaisedButton label="Login" secondary={true} onClick={()=>this.login()}/>             
              <Paper style={styles.paperStyle}>
                <div style={{marginLeft:"0px",borderLeft:"6px solid #339966"}}>
                  <h2 style={{marginLeft:"15px"}}>Register </h2>
                </div> 
             
                <form onSubmit={handleSubmit(this.register.bind(this))} style={{margin:"auto",width:"300"}}>
                    <div>                  
                       <Field name="fullname" label="Full Name" type="text" component={Text}/>
                    </div>
                    
                    <div>
                       <Field name="email" label="Email" type="email" component={Text}/> 
                    </div>

                    <div>
                       <Field name="password" label="Password" type="password" component={Text}/>
                    </div>
                    
                    <div>
                     <div style={commonMargin}><b>I am a </b></div>                        
                        <Field name="userType" component={RadioGroup}>
                            <RadioButton value="teacher" label="Teacher" style={radioButtonStyle}/>
                            <RadioButton value="student" label="Student" style={radioButtonStyle}/>
                            <RadioButton value="staff" label="Staff" style={radioButtonStyle} /> 
                        </Field>
                     </div>
                    <RaisedButton label="Register" style={commonMargin} primary={true} type="submit"/>                  
                </form>
              </Paper>  
              </div>
                {this.dialogOpen&&<DialogBox dialog={this.dialog}/>}               
              </div>
        )
    }
}

export default reduxForm({
    form:'Register',
    validate
})(Register);