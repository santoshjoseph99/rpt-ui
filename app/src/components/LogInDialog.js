import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password:$password) {
    token,
    user {
      id,
      email,
      name
    }
  }
}
`;
export default class LogInDialog extends React.Component {
  state = {
    open: false,
    email: '',
    password: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  loginDone = (data) => {
    console.log('DONE:', data);
    this.setState({ open: false });
    this.props.logIn({token: data.login.token, user: data.login.user });
  }

  loginError = (err) => {
    console.log('ERROR:', err);
    window.alert(err);
    this.props.logIn(false);
  }

  render() {
    const {email, password} = this.state;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Log In
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Log In</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Mutation mutation={LOGIN_MUTATION} onCompleted={this.loginDone} onError={this.loginError} variables={{ email, password }}>
              {loginMutation => <Button onClick={loginMutation} color="primary">Log In</Button>}
            </Mutation>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}