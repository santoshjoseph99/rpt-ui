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

const CREATECOMMENT_MUTATION = gql`
mutation CreateCommentMutation($message: String!,
  $isPublic: Boolean!,
	$parentCommentId:ID) {
  createComment(message: $message, isPublic:$isPublic, parentCommentId: $parentCommentId) {
  	id,
    createdAt,
    updatedAt,
    message,
    author {
      name,
      id
    }
  }
}
`;

export default class CreateCommentDialog extends React.Component {
  state = {
    open: false,
    message: '',
    isPublic: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  createDone = (data) => {
    this.props.commentCreated(data.createComment);
    this.setState({ open: false, message: '' });
  }

  createError = (err) => {
    console.log('ERROR:', err);
    window.alert(err);
  }

  render() {
    const {message, isPublic} = this.state;
    return (
      <div style={{marginRight: '10px'}}>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          New Comment
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Comment</DialogTitle>
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
          onChange={e => this.setState({isPublic: e.target.checked})}
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
            <Mutation mutation={CREATECOMMENT_MUTATION} onCompleted={this.createDone} onError={this.createError} variables={{ message, isPublic }}>
              {mutation => <Button onClick={mutation} color="primary">Create</Button>}
            </Mutation>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}