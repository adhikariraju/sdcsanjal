import React from 'react';
import TextField from 'material-ui/TextField';
import {white, teal400,teal200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';

const SearchBox = () => {

  const styles = {
    iconButton: {
      float: 'left',
      paddingTop: 17
    },
    textField: {
      color: white,
      backgroundColor: teal200,
      borderRadius:2,
      height: 35,
      marginTop:12,
      width:'75%'
    },
    inputStyle: {
      color: white,
      paddingLeft: 5
    },
    hintStyle: {
      height: 16,
      paddingLeft: 5,
      color: white
    }
  };

  return (
    <div>
      <IconButton style={styles.iconButton} >
      <Search color={white} />
      </IconButton>
      <TextField
        hintText="Search..."
        underlineShow={false}
        style={styles.textField}
        inputStyle={styles.inputStyle}
        hintStyle={styles.hintStyle}
      />
    </div>
  );
};

export default SearchBox;