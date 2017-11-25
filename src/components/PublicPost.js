import React,{Component} from 'react'
import {Card,CardHeader,CardMedia,CardTitle,CardText,CardActions} from 'material-ui/Card'
import postDetails from '../../json-server/postList.json'
import FontIcon from 'material-ui/FontIcon';
import Comment from './Comment'
import Like from 'material-ui/svg-icons/action/thumb-up'

class PublicPost extends Component{
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
        console.log("post image",image)
         return(
            <Card style={{margin:'10px'}}>
                <CardHeader title={<a>{post.userDetail[0].name}</a>} 
                    subtitle={post.createAt} avatar={image}>
                </CardHeader>
                    <hr style={{lineWidth:'0.5px #ffffff'}}/>
                <CardTitle>
                    {post.title}
                </CardTitle>
                <CardText>
                    {post.post}
                </CardText>
                <CardActions>
                   { // <Like/>
                   }
                    <Comment/>
                       
                    
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

export default PublicPost;