import React,{Component} from 'react'
import {Field,reduxForm} from 'redux-form'
import Text from './form-controls/Text'
import MultiSelect from './form-controls/MultiSelect'
import {validate} from "../validation/postValidation"
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton' 
import Quill from './form-controls/Quill'
// import {SelectField} from 'redux-form-material-ui'

export class NewPost extends Component{

handleFormSubmit(values){
console.log("values",values)

let data={
  "userid":this.props.userid
};
  let formData={...values,...data}
  console.log("this.post",formData)
  this.props.submitPost(formData);
}

  render(){
      const { handleSubmit, pristine, reset, submitting } = this.props;
       const paperStyle={
          height:400,
          maxWidth:'1042',
          margin:'auto',
          marginTop:'10',
          padding:'10',
          paddingLeft:30,
          paddingRight:50
       };
        

       const buttonStyle={
         marginTop:'30'
       }

        return(
           <div>
            <Paper style={paperStyle}> 
             <div>
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
               <div>
                 <Field name="Title" 
                  label="Title"
                  floatingLabelFixedStyle={{color:"#26A69A"}}
                  component={Text}
                  fullWidth={true}
                  placeholder="Give the title to your question"
                  />
               </div>
               <div>
                 <Field name="Question"
                   placeholder="Post your question"
                   component={Quill}
                   style={{height:"140px"}}
                 />
                   </div> 
               <div>
                  <Field name="Tags"
                    label="Select Tags"
                    component={MultiSelect}>
                    <MenuItem value="sem1" primaryText="1st Sem"/>
                    <MenuItem value="sem2" primaryText="2nd Sem"/>
                    <MenuItem value="sem3" primaryText="3rd Sem"/>
                    <MenuItem value="sem4" primaryText="4th Sem"/>
                    <MenuItem value="sem5" primaryText="5th Sem"/>
                    <MenuItem value="sem6" primaryText="6th Sem"/>
                    <MenuItem value="sem7" primaryText="7th Sem"/>
                    <MenuItem value="sem8" primaryText="8th Sem"/>    
                  </Field>   
                  
               </div> 
      
                 <div>
                   <RaisedButton style={buttonStyle} label="Submit" primary={true} type="submit"/>
                 </div>

            </form>
            </div>
          </Paper>  
        </div>
        )
    }
}

export default reduxForm({
  form:'NewPost',
  validate
})(NewPost);