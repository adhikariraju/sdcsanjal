import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import NewPost from './PostContainer.jsx'
import Login from './LoginContainer.jsx'
import Register from './RegisterContainer.jsx'
import image from '../assets/ssanjallogo.png'


export default class Main extends Component{
    render(){
        const appbarStyle={
        fontFamily:"Roboto",
        fontWeight:"bolder"   
        }
        
    return(
            <div>
                <AppBar
                iconElementLeft={<img src={image} />}  
                        
                />
                <Switch>
                   <Route  path="/register" component={Register}/>
                   <Route  exact path="/" component={Login}/>
                    
                </Switch>
            </div>
    )
    }
}