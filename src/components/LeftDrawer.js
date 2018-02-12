import React,  { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import {spacing, typography} from 'material-ui/styles';
import {white, grey500,teal400,grey900} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import image from '../assets/ssanjallogo.png'
import RaisedButton from 'material-ui/RaisedButton'
import AddImg from 'material-ui/svg-icons/Image/add-a-photo'

const LeftDrawer = (props) => {

  


  let { navDrawerOpen } = props;
  let profilePic='';
  
  if(props.profileDetails){
   profilePic=require(`../appMediaFiles/userProfilePics/${props.profileDetails}`);
  }
  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: teal400,
      paddingLeft: 30,
      height: 56,
    },
    menuItem: {
      fontSize: 14,
      color:grey500,
      fontWeight:'bolder'
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        height: 45
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: 12,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
      },
      span: {
        paddingTop: 12,
        display: 'block',
        color: 'white',
        fontWeight: 300,
        textShadow: '1px 1px #444'
      }
    },
    drawer:{
      backgroundColor:grey900,
    }
  };

  return (
    <Drawer
      docked={true}
      open={navDrawerOpen}
      zDepth={1}
      containerStyle={styles.drawer}
      >
       
        <div style={styles.logo}>
          <img src={image} height="60"/>
        </div>
        <div style={styles.avatar.div}>
          <Avatar size={50}
                  src={profilePic}
                  style={styles.avatar.icon}
                 />
          <span style={styles.avatar.span}>{props.username}</span>
          <AddImg color={white} style={{cursor:"pointer"}}/>
        </div>
        <div>
          {props.menus.map((menu, index) =>
            <MenuItem
              key={index}
              style={styles.menuItem}
              primaryText={menu.text}
              leftIcon={menu.icon}
              containerElement={<Link to={menu.link}/>}
            />
          )}
        </div>
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
};

export default LeftDrawer;
