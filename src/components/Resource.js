import React,{Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Upload from 'material-ui/svg-icons/file/file-upload'
import Dialog from 'material-ui/Dialog'
import {Field,reduxForm} from 'redux-form'
import Text from './form-controls/Text'
import MultiSelect from './form-controls/MultiSelect'
import {FileInput} from './form-controls/FileInput'
import DialogBox from './DialogBox'
import MenuItem from 'material-ui/MenuItem'
import axios from 'axios'
import {CardHeader} from 'material-ui/Card'
import ResourceList from './ResourceList';



class Resource extends Component{
    constructor(props){
        super(props);
        this.state={handleOpen:false,
                    program:'',
                    uploadSuccess:false,
                    uploadMsg:{}
                }
        this.uploadFile=this.uploadFile.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    uploadFile(){
      this.setState({handleOpen:true})
    }
    
    handleFileSubmit(values){
        console.log('values',values.upload)
        
        let tags=[];
        let file=new FormData();
        file.append('file',values.upload);
        
       (values.semester)&&
         tags.push(values.program+' '+values.semester);

       (values.year)&&
          tags.push(values.program+' '+values.year)
        file.append('createdBy',this.props.userDetail._id);
        file.append('title',values.title);
        file.append('tags',tags);
        console.log("file",file)
        axios.post("http://localhost:3000/resource",file)
       .then((result)=>{
           console.log("result",result);
           this.setState({

              uploadSuccess:result.data.success,
              uploadMsg:{
                 title:(result.data.success)?"Upload Success":"Failed to Upload",
                 content:result.data.status 
              }
           })
       })
    }
    
    
    handleChange(event,value){
     console.log('event',value);
     this.setState({program:value});
    }

    handleClose(){
        this.setState({handleOpen:false})
    }

    semesterList(){
      return(
       <div>   
       <Field name="semester"
        label="Select semester"
        component={MultiSelect}>
        <MenuItem value="1st Sem" primaryText="1st Sem"/>
        <MenuItem value="2nd Sem" primaryText="2nd Sem"/>
        <MenuItem value="3rd Sem" primaryText="3rd Sem"/>
        <MenuItem value="4th Sem" primaryText="4th Sem"/>
        <MenuItem value="5th Sem" primaryText="5th Sem"/>
        <MenuItem value="6th Sem" primaryText="6th Sem"/>
        <MenuItem value="7th Sem" primaryText="7th Sem"/>
        <MenuItem value="8th Sem" primaryText="8th Sem"/>    
      </Field>
      </div>
    )
    }

     year(){
      return(
        <div>    
           <Field name="year"
                label="Select Year"
                component={MultiSelect}>
                <MenuItem value="1st year" primaryText="1st Year"/>
                <MenuItem value="2nd year" primaryText="2nd Year"/>
                <MenuItem value="3rd year" primaryText="3rd Year"/>
                <MenuItem value="4th year" primaryText="4th Year"/> 
           </Field>
        </div>
        )
    }

    

  render(){
      console.log("resource",this.props)
      const { handleSubmit, pristine, reset, submitting } = this.props
      const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.handleClose.bind(this)}
        />     
    ];
      return(
          <div className="resource" style={{...this.props.style}}>
            {
            this.props.userDetail.type==="teacher"&&
            (
                
                <div>
                  <RaisedButton
                    label="Upload Resource"
                    labelPosition="before"
                    secondary={true}
                    icon={<Upload />}
                    style={{align:"left"}}
                    onClick={this.uploadFile}
                  />
                  <Dialog
                    title="Upload Resource"
                    open={this.state.handleOpen}
                    actions={actions}
                  >
                     <form onSubmit={handleSubmit(this.handleFileSubmit.bind(this))} encType="multipart/form-data">
                      <div>
                        <Field name="title" label="Title" type="text" component={Text}/>
                      </div>
                      <div> 
                        <Field name="upload" component={FileInput}  />
                      </div>
                      <div>
                        <Field name="program" label="Select program" onChange={this.handleChange} 
                         component={MultiSelect}>
                         <MenuItem value="BBS" primaryText="BBS"/>
                         <MenuItem value="BIM" primaryText="BIM"/>
                         <MenuItem value="BBA" primaryText="BBA"/>
                        </Field>
                       </div>
                       {(this.state.program==="BBS")&&
                         this.year()}
                        {(this.state.program==="BBA"||this.state.program==="BIM")&&this.semesterList()}
                      <RaisedButton type="submit" primary={true} label="Submit"/>
                     </form>
                  </Dialog>      
                  {this.state.uploadSuccess&&<DialogBox dialog={this.state.uploadMsg} />}             
                </div>                   
            )
            }
            <ResourceList/>
          </div>
        )
  }
}

export default reduxForm({
    form:'FileUpload'
})(Resource)