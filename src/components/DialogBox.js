import React,{Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class DialogBox extends Component {
   constructor(){
    super();
      
    this.state = {
        open: true,
    };
    this.handleClose=this.handleClose.bind(this);
   }  

  
  handleClose(){
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleClose}
      />,
     
    ];

    return (
      <div>
        <Dialog
          title={this.props.dialog.title}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          {this.props.dialog.content}
        </Dialog>
      </div>
    );
  }
}