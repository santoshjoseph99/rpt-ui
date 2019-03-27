import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const EDITCOMMENT_MUTATION = gql`
mutation EditComment($id: ID!, $message:String, $isPublic: Boolean) {
  editComment(id:$id, message:$message, isPublic:$isPublic){
    id,
  	message,
    isPublic
  }
}
`;


export default class EditCommentDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: props.message,
      isPublic: props.isPublic,
      id: props.id,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  createDone = (data) => {
    this.setState({ open: false, message: '' });
  }

  createError = (err) => {
    console.log('ERROR:', err);
    window.alert(err);
  }

  handleCheckbox = (e) => {
    this.setState({
      isPublic: false //TODO: fix
    });
  }

  render() {
    const {message, isPublic, id} = this.state;
    return (
      <div>
            <IconButton onClick={this.handleClickOpen}>
              <EditIcon />
            </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Comment</DialogTitle>
          <DialogContentText>
          </DialogContentText>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="message"
              label="Message"
              type="text"
              value={message}
              onChange={e => this.setState({ message: e.target.value })}
              fullWidth
            />
            <Checkbox
            id="public"
          checked={isPublic}
          onChange={e => this.setState({isPublic: e.target.value})}
          value={"isPublic"}
        />
        <InputLabel
          htmlFor="public"
        >
          Public Comment
        </InputLabel>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Mutation mutation={EDITCOMMENT_MUTATION} onCompleted={this.createDone} onError={this.createError} variables={{ id, message, isPublic }}>
              {mutation => <Button onClick={mutation} color="primary">Save</Button>}
            </Mutation>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}