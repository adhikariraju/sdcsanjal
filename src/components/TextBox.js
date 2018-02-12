import React from 'react';
import TextField from 'material-ui/TextField';
import {grey700,teal400,teal200} from 'material-ui/styles/colors';

const TextBox = (props) => {

  const styles = {
    
    textField: {
      color: grey700,
      borderRadius:2,
      height: 35,
      marginTop:12,
      width:'75%',
      border:`1px solid ${grey700}`
    },
    inputStyle: {
      color: grey700,
      paddingLeft: 5
    },
    hintStyle: {
      height: 16,
      paddingLeft: 5,
      color: grey700
    }
  };

  return (
    
       <TextField
        ref={props.inputRef}
        hintText={props.placeholder}
        underlineShow={false}
        style={styles.textField}
        inputStyle={styles.inputStyle}
        hintStyle={styles.hintStyle}
        value={props.value}
        onChange={props.onChange}

      >
      </TextField>
  );
};

export default TextBox;
