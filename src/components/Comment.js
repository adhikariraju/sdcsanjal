import React,{Component} from 'react'


class Comment extends Component{
    constructor(props){
      super(props);
      this.state={comment:'',
                  comments:[]           
                  }
      this.handleChange=this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.displayComments=this.displayComments.bind(this);
    }
    handleChange(event){
      this.setState({
          comment:event.target.value
      })
    }
    handleSubmit(event){
        console.log("comment value",this.state.comment)
        this.setState({comments:[...this.state.comments,{name:'admin',comment:this.state.comment}]})
        event.preventDefault();
    }
    
    displayComments(){
        return this.state.comments.map((comment,i)=>{         
          return(<ul>
              <b>{comment.name}</b>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                     {comment.comment}
            </ul>)
        })
    }
   
    render(){
        console.log("comments",this.state.comments)
        return(
         <div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" style={{marginLeft:"50px"}} value={this.state.comment} onChange={this.handleChange} placeholder="Write a comment"/>
              <input type="submit" value="Comment"/>
            </form>
            {this.displayComments()}
         </div>  
        )
    }

}

export default Comment;