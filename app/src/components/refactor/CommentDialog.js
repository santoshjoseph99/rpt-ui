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
  handleOpen,
  renderBtn,
  dialogTitle,
  mutationFn,
  mutationButtonText,
  open,
  message,
  isPublic,
  id,
  parentCommentId,
  onChangeMessage,
  onChangeIsPublic,
  handleClose,
  mutationDone,
  mutationError }) => {
  return (
    <div style={{ marginRight: '10px' }}>
      {renderBtn && renderBtn(handleOpen)}
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Mutation mutation={mutationFn}
                    onCompleted={mutationDone}
                    onError={mutationError}
                    variables={{ message: message.value, isPublic: isPublic.value, parentCommentId, id }}>
            {mutation => <Button variant="contained" onClick={mutation} color="primary">{mutationButtonText}</Button>}
          </Mutation>
        </DialogActions>
      </Dialog>
    </div>
  );
}