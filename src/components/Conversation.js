import React,{Component} from 'react'
import axios from 'axios'
import {Card,CardHeader,CardText,CardActions} from 'material-ui/Card'
import {Link} from 'react-router-dom'
import {FlatButton} from 'material-ui/FlatButton'

const style={
  createMsg:{
    margin:"85% 20px 20px 15px",
    position:"static"
  }
}

class Conversation extends Component{
   constructor(props){
      super(props);
      this.state={
        conversation:[]
      }
   }
   
   conversationList(){
     
      return this.state.conversation.map((conv,index)=>{
        let image=require(`../appMediaFiles/userProfilePics/${conv.friend[0].profile_pic}`);
          return <Card key={index} style={{hover:"pointer"}} 
                       onClick={()=>this.props.history.push("/dashboard/message",{convDetail:conv})}>
                    <CardHeader
                      title={conv.friend[0].name}
                      subtitle={conv.updatedAt}
                      avatar={image}>                  
                    </CardHeader>
                    <CardText>
                      {conv.recentChat}
                    </CardText>  
                    
                 </Card> 
      })
   }

   
    componentDidMount(){
        axios.post("http://localhost:3000/conversation",{_id:this.props.userId})
             .then((data)=>{
               console.log('data',data)
               this.setState({conversation:[...data.data]})
             })    
    }

   render(){
     console.log("state",this.state)
     console.log("props",this.props)
       return(
          <div style={{...this.props.style}} className="convList" > 
            {this.conversationList()}
          </div>
        )
   }
}
export default Conversation;