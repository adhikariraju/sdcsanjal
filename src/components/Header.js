import React, {Component,PropTypes} from 'react';
import {Link,Redirect,history,router} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import MailBox from 'material-ui/svg-icons/communication/mail-outline';
import Bell from 'material-ui/svg-icons/social/notifications';
import HomeIcon from 'material-ui/svg-icons/action/home'


import {white} from 'material-ui/styles/colors';
import SearchBox from './SearchBox';

class Header extends Component {
  constructor(){
    super();
    this.message=this.message.bind(this);
  }
   

  message(){
    this.props.history.push('/dashboard/message');
  }

  render() {
    console.log("this.props",history);
    console.log("this.router",router)
    const {styles, handleChangeRequestNavDrawer} = this.props;

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57,
       
      },
      menuButton: {
        marginLeft: 25
      },
      iconsRightContainer: {
        marginLeft:0
      }
    };
    console.log("this.props",this.props);
    return (
        <div>
            <AppBar
              style={{...styles, ...style.appBar}}
              title={
                <SearchBox />
              }
              iconElementLeft={
                  <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
                    <Menu color={white} />
                  </IconButton>
              }
              iconElementRight={
                <div style={style.iconsRightContainer}>
                  <IconButton
                    targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    onClick={()=>this.props.history.push('/')} >
                    <HomeIcon color={white}/>
                  </IconButton>
                
                              
      
                  
                  <IconMenu color={white}
                            iconButtonElement={
                              <IconButton><Bell color={white}/></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  >
                    
                  </IconMenu> 

                  <IconMenu color={white}
                            iconButtonElement={
                              <IconButton><MailBox color={white} /></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  >
                    <MenuItem primaryText="messages" containerElement={<Link to="/dashboard/conversation" />}/>
                  </IconMenu>
                  
                  <IconMenu color={white}
                            iconButtonElement={
                              <IconButton><MoreVertIcon color={white}/></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  >
                    <MenuItem primaryText="Sign out" containerElement={<Link to="/" />}/>
                  </IconMenu>
                </div>
              }
            />
          </div>
      );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;
