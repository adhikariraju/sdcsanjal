import React,{Component} from 'react'
import TextBox from './TextBox.js'
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton'

class Comment extends Component{
    constructor(props){
      super(props);
      this.state={comment:'',
                  comments:props.comments          
                  }
      this.handleChange=this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.displayComments=this.displayComments.bind(this);
    }

    handleChange(event){
     console.log("comment",event.target.value)   
      this.setState({
          comment:event.target.value
      })
    }
    
    handleSubmit(event){
        event.preventDefault();
        if(this.state.comment.trim()===''){
           this.setState({comment:''})
           this.commentBox.focus();
        }
        else{
        this.setState({comments:[...this.state.comments,{commenter:this.props.name,comment:this.state.comment.trim()}]})
        axios.post("http://localhost:3000/comment",{commenter:this.props.name,comment:this.state.comment,postId:this.props.postId})
        .then((result)=>{
        })     
           this.setState({comment:''})
          }
    }
    
    displayComments(){
        if(Array.isArray(this.state.comments)){ 
            return this.state.comments.map((comment,i)=>{         
              return(<ul>
                <b>{comment.commenter}</b>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                        {comment.comment}
                </ul>)
            })
        }
    }

   
    render(){
        console.log("comments",this.state)
        return(
         <div>
            <form onSubmit={this.handleSubmit}>
              <TextBox style={{marginLeft:"50px"}} inputRef={el=>this.commentBox=el} value={this.state.comment} onChange={this.handleChange} placeholder="Write a comment"/>
              <RaisedButton type="submit" primary={true} label="Comment"/>
            </form>
            {this.displayComments()}
         </div>  
        )
    }

}

export default Comment;