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
import ReplyIcon from '@material-ui/icons/Reply';
import IconButton from '@material-ui/core/IconButton';


export default ({open, toggle, message, isPublic, parentCommentId, title}) => {
    return (
      <div style={{marginRight: '10px'}}>
        <Dialog
          open={open}
          onClose={toggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
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
            disabled={true}
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
            <Mutation mutation={CREATECOMMENT_MUTATION} onCompleted={this.createDone} onError={this.createError} variables={{ parentCommentId, message, isPublic }}>
              {mutation => <Button variant="contained" onClick={mutation} color="primary">Reply</Button>}
            </Mutation>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}