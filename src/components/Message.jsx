import React,{Component} from 'react'
import socketIOClient from 'socket.io-client'
import {reduxForm,Field} from 'redux-form'
import Text from './form-controls/Text.js'
import RaisedButton from 'material-ui/RaisedButton';
import {teal100} from 'material-ui/styles/colors';
import axios from 'axios'

const style={
  createMsg:{
    bottom:"10px",
    position:"fixed",
    width:"80%"
  },
  messageText:{
    
  },
  messageBlock:{
    margin:"10px",
    height:"40px",
    width:"50%",
    display:"block",
    borderRadius:"4px",
    padding:"15px"
  }
}

class Message extends Component{
   constructor(props){
      super(props);
      this.state={messageList:[],
                 convId:"",
                 friendId:""}
   this.submit=this.submit.bind(this);
   }


   submit(values){      
      console.log("messaged",values);
      console.log("this.convDetail",this.convDetail)
      this.setState({messageList:this.state.messageList.concat({sender:this.props.userId,content:values.Message})})
      this.socket.emit('message',{convId:this.convDetail._id,sender:this.props.userId,content:values.Message});  
      values.Message='';
    }

    componentDidMount(){
     let messageList=[];
     if(Array.isArray(this.props.history.location.state.convDetail.messages)){
        messageList=this.props.history.location.state.convDetail.messages;
        this.setState({
            messageList:[...messageList]
        })          
     }
     this.convDetail={...this.props.history.location.state.convDetail};
      console.log("inside message")
      this.socket=socketIOClient("http://localhost:80");     
      this.socket.on(this.convDetail._id,(data)=>{
        this.setState({messageList:this.state.messageList.concat({sender:data.sender,content:data.content})})
      })
    }

    messageList(){
      
      return this.state.messageList.map((message,index)=>{
        let blockStyle={backgroundColor:"#f2f2f2",float:"left"};
         if(message.sender===this.props.userId){
           blockStyle.backgroundColor=teal100;
           blockStyle.float="right";           
          }         
        return <div style={{...blockStyle,...style.messageBlock}}>
                <h3 style={{...style.messageText}}>               
                  {message.content}
                </h3>
               </div>  
      })
    }
  
   render(){
     console.log("state",this.state);
     console.log("props",this.props)  
     
     const convId=this.props.history.location.state.convDetail._id;
     const {handleSubmit}=this.props;
       return(
          <div style={{...this.props.style}} className="msg"> 
          <div>
            {this.messageList()}
          </div>
            <div className="createMsg" style={style.createMsg}>
             <form onSubmit={handleSubmit(this.submit)}>
                 
                 <Field style={{width:'90%'}} type="text" name="Message" placeholder="Enter your message" fullWidth={true} component={Text}/>
                 <RaisedButton label="Send" primary={true} type="submit"/>
             </form>     
            </div>
          </div>
        )
   }
}
export default reduxForm({
  form:'message'
})(Message);