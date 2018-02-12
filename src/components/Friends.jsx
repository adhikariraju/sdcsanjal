import React,{Component} from 'react'
import {Card,CardHeader,CardText,CardActions} from 'material-ui/Card'
import axios from 'axios';
import {Link} from 'react-router-dom'


export default class Friends extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[]
        }
        this.message=this.message.bind(this);
    }

    componentDidMount(){
      axios.get("http://localhost:3000/userlist")
           .then(result=>{
               this.setState({
                   users:result.data.userList
               })
           })
            
    }

    message(id){
        let convDetail=null;
       axios.post("http://localhost:3000/cuConv",{nextid:id,domainid:this.props.userDetail._id})
            .then(result=>{
              console.log("convid",result);
              convDetail=result.data.convDetail;
            })
            .then(()=>{
             if(convDetail){
             this.props.history.replace("/dashboard/message",{convDetail:convDetail})
             }
             else{
              this.props.history.replace("/dashboard/message",{convDetail:null,nextId:id})
             }}
        )     
    }

    userList(){
      return this.state.users.map((user,index)=>{
        let image=require(`../appMediaFiles/userProfilePics/${user.profile_pic}`);
          
                if(user._id!==this.props.userDetail._id){
                   return (<Card key={index} style={{cursor:"pointer"}}>
                          <CardHeader
                        title={user.name}
                        subtitle={user.type}
                        avatar={image}>                  
                        </CardHeader>    
                            <span style={{cursor:"pointer"}} onClick={()=>{this.message(user._id)}}>Message</span>
                    </Card>)
                 }

                else return "";
                
      })           
    } 

    render(){
        return(
            <div style={{...this.props.style}}>
              {this.userList()}              
            </div>
        )
    }    
}