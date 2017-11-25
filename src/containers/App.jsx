import React, { PropTypes } from 'react';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import PublicPost from '../containers/PublicPostContainer.jsx'
import NewPost from './PostContainer.jsx'
import axios from 'axios'
import {Router,Switch,Route,Redirect,Link} from 'react-router-dom'
import Message from '../components/Message.jsx'
import Conversation from '../components/Conversation.js'
import Resource from '../components/Resource.js'
import {connect} from 'react-redux'
//import ThemeDefault from '../theme-default';
import Data from '../data';
import {saveUserDetails} from '../actions/saveUserDetails'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: true,
      profileDetails:undefined
    };
  }

  componentDidMount(){
    let getProfile=axios.post('http://localhost:3000/profile',{_id:this.props.userDetails.id});
      getProfile.then(result=>{
        console.log("result",result); 
      
        this.props.saveUserDetails(result.data.profile)
      
        this.setState({
          profileDetails:result.data
        })
      });
        
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    console.log("this.props",this.props)
    const userId=this.props.userDetails._id;
    var profileName='';
    var profilePic=''
    if(this.state.profileDetails){
      profileName=this.state.profileDetails.profile.name
      profilePic=this.state.profileDetails.profile.profile_pic 
    }

    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;
    
    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
        
      }
    };

    const main=()=>{
      return(
        <div style={styles.container}>
          <NewPost userid={userId}/>
          <PublicPost/>
        </div>
      )
    }

    return(
        <div>
          <Header styles={styles.header}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}
                  history={this.props.history}
                  />
    
            <LeftDrawer navDrawerOpen={navDrawerOpen}
                        menus={Data.menus}
                        username={profileName}
                        profileDetails={profilePic}/>
              
                <Switch>
                  <Route exact path="/dashboard/message" render={()=><Message history={this.props.history} userId={userId} style={styles.container}/>}/>
                    
                  <Route exact path="/dashboard/conversation" render={()=><Conversation history={this.props.history} userId={userId} style={styles.container}/>}/>
                  
                  <Route exact path="/dashboard/resource" render={()=><Resource userDetail={this.props.userDetails} style={styles.container}/>}/>

                 
                  {//<Route exact path="/dashboard/resource" render={()=><Resource history={this.props.history} userDetail={this.props.userDetail} style={styles.container}/>}/>
                  }
                  <Route component={main} />
                </Switch>            
        </div>
    );
  }
}

App.propTypes = {
  width: PropTypes.number
};

const mapStateToProps=(state)=>{
  return{
    userDetails:state.userDetail.details
  }
}

const mapDispatchToProps=(dispatch)=>{
    return{
       saveUserDetails:(profile)=>dispatch(saveUserDetails(profile))
    }
}


export default withWidth()(connect(mapStateToProps,mapDispatchToProps)(App));