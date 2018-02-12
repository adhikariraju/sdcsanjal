import React,{Component} from 'react'
import {Card,CardHeader,CardMedia,CardTitle,CardText,CardActions} from 'material-ui/Card'
import {teal400,teal200,grey100} from 'material-ui/styles/colors';
import postDetails from '../../json-server/postList.json'
import FontIcon from 'material-ui/FontIcon';
import Comment from './Comment'
import Like from 'material-ui/svg-icons/action/thumb-up'

class Post extends Component{
    constructor(props){
      super(props);
      this.postList=this.postList.bind(this);
      this.state={postDetails:''}
    }

    componentDidMount(){
        this.props.getPost();
    }
    
    componentWillReceiveProps(nextProps){
      if(nextProps.postDetail!=null){
        console.log("nextProps",nextProps.postDetail) 
        this.setState({
              postDetails:nextProps.postDetail
          })
      }
    }
    
    postList(){
       if(this.state.postDetails){
       return this.state.postDetails.map((post,i)=>{           
        let image=require(`../appMediaFiles/userProfilePics/${post.userDetail[0].profile_pic}`);
        console.log("post image",image);
        let realpost=post.post.replace('img','img style="max-width:100%;max-height:100%"')
         return(
            <Card style={{margin:'10px'}}>
                <CardHeader title={<a>{post.userDetail[0].name}</a>} 
                    subtitle={post.createAt} 
                    avatar={image}>
                </CardHeader>
                    <hr style={{lineWidth:'0.1px #ffffff'}}/>
                <CardTitle style={{color:"black"}}>
                    {post.title}
                </CardTitle>
                <CardText style={{backgroundColor:grey100,margin:"15px 20px 15px 20px",borderRadius:"5px"}} 
                 dangerouslySetInnerHTML={{__html:realpost}}/>
                    
                <CardActions>
                   { // <Like/>
                   }
                    <Comment {...this.props.userDetails} comments={post.comment} postId={post._id}/>                   
                </CardActions>
           </Card>)
        })
      }
    }

    render(){
        
        return(
           <div>
             {this.postList()}
           </div>
        )
    }

}

export default Post;