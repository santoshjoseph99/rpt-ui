import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Mutation } from 'react-apollo';
import { SIGNUP_MUTATION } from '../utils/mutations';


export default class SignUpDialog extends React.Component {
  state = {
    open: false,
    email: '',
    password: '',
    name: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  signUpDone = (data) => {
    this.setState({ open: false });
    this.props.logIn({token: data.signup.token, user: data.signup.user });
  }

  signUpError = (err) => {
    window.alert(err);
    this.props.logIn(false);
  }

  render() {
    const {email, password, name} = this.state;
    return (
      <div style={{marginRight: '10px'}}>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          Sign Up
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Sign up for an account so you can add comments.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
              label="Password"
              type="password"
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              label="Name"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Mutation mutation={SIGNUP_MUTATION} onCompleted={this.signUpDone} onError={this.signUpError} variables={{ email, password, name }}>
              {signupMutation => <Button variant="contained" onClick={signupMutation} color="primary">Sign Up</Button>}
            </Mutation>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}