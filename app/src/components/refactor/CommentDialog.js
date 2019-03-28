import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Mutation } from 'react-apollo';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';

export default ({
  buttonText,
  dialogTitle,
  mutationFn,
  mutationButtonText,
  open,
  message,
  isPublic,
  onChangeMessage,
  onChangeIsPublic,
  handleClick,
  createDone,
  createError }) => {
  return (
    <div style={{ marginRight: '10px' }}>
      <Button variant="contained" color="primary" onClick={handleClick}>
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            type="text"
            value={message.value}
            onChange={onChangeMessage}
            fullWidth
          />
          <Checkbox
            id="public"
            checked={isPublic.value}
            onChange={onChangeIsPublic}
            value={"isPublic"}
          />
          <InputLabel htmlFor="public">Public Comment</InputLabel>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="primary">
            Cancel
          </Button>
          <Mutation mutation={mutationFn} onCompleted={createDone} onError={createError} variables={{ message: message.value, isPublic: isPublic.value }}>
            {mutation => <Button variant="contained" onClick={mutation} color="primary">{mutationButtonText}</Button>}
          </Mutation>
        </DialogActions>
      </Dialog>
    </div>
  );
}