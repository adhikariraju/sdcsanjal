import React,{Component} from 'react'
import {Card,CardHeader,CardText,CardActions} from 'material-ui/Card'
import axios from 'axios';

export default class ResourceList extends Component{
   constructor(props){
       super(props);
       this.state={
           resourceList:[]
       }
   }

   download(file){
    //  axios.get('http://localhost:3000/download/'+file)
    //  .then(result=>{
    //      console.log("result",result);
    //     window.open(result.data);
    //  })  
    window.open('http://localhost:3000/download/'+file);
   }

   resourceList(){
       const margin={
           align:"center",
           margin:"20px"
       }
       return this.state.resourceList.map((resource,index)=>{
           return <Card>
                    <CardHeader
                        title={resource.title}
                        subtitle={resource.createdAt+''}>
                    </CardHeader>
                    <span style={margin}>{resource.tags}</span>
                    <span style={margin}>{resource.creator[0].name}</span>
                    <span style={{margin,...{cursor:"pointer"}}} onClick={()=>{this.download(resource.file)}}>Download</span>
                  </Card>
        })
   }

    componentDidMount(){
       axios.get("http://localhost:3000/resource")
            .then((result)=>{
               this.setState({
                   resourceList:[...result.data]
               })
            })
   }
    
   render(){
       return(
          <div> 
           {this.resourceList()}
          </div>
        )
   }
}