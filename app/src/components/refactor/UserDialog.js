import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Mutation } from 'react-apollo';

export default ({
  handleOpen,
  renderBtn,
  dialogTitle,
  dialogContentText,
  mutationFn,
  mutationButtonText,
  open,
  email,
  password,
  name,
  onChangeEmail,
  onChangePassword,
  onChangeName,
  handleClose,
  mutationDone,
  mutationError
}) => {
  return (
    <div style={{display: 'inline', marginRight: '10px'}}>
      {renderBtn && renderBtn(handleOpen)}
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialogContentText}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          value={email.value}
          onChange={onChangeEmail}
          type="email"
          fullWidth
        />
        <TextField
          margin="dense"
          id="password"
          value={password.value}
          onChange={onChangePassword}
          label="Password"
          type="password"
          fullWidth
        />
        {
          onChangeName &&
          <TextField
            margin="dense"
            id="name"
            value={name.value}
            onChange={onChangeName}
            label="Name"
            type="text"
            fullWidth
          />
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Mutation mutation={mutationFn}
                  onCompleted={mutationDone}
                  onError={mutationError}
                  variables={
                  {
                    email: email.value,
                    password:password.value,
                    name: name ? name.value : undefined
                  }
        }>
          {mutation => <Button variant="contained" onClick={mutation} color="primary">{mutationButtonText}</Button>}
        </Mutation>
      </DialogActions>
    </Dialog>
  </div>
  );
}
