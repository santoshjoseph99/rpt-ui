import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import FeedData from '../containers/FeedData';
import FeedSubscriptionData from '../containers/FeedSubscriptionData';
import ListComments from './ListComments';
import Notice from './Notice';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SignUpDialog from './SignUpDialog';
import LogInDialog from './LogInDialog';
import CreateCommentDialog from './CreateCommentDialog';

const styles = theme => ({
  page: {
    margin: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  appBar: {
    position: 'relative',
  },
  show: {
    display: 'inline'
  },
  hide: {
    display: 'none'
  }
});

const enhanced = compose(withStyles(styles));

class TestPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      newComment: {}
    };
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.commentEdited = this.commentEdited.bind(this);
    this.commentDeleted = this.commentDeleted.bind(this);
    this.commentCreated = this.commentCreated.bind(this);
  }

  commentDeleted(id) {

  }

  commentEdited(id, message, isPublic) {

  }

  logIn(value) {
    this.setState({
      loggedIn: value ? true : false
    });
    if(value && value.token) {
      localStorage.setItem('auth-token', value.token);
    }
  }

  logOut() {
    this.setState({
      loggedIn: false
    });
    localStorage.removeItem('auth-token');
  }

  commentCreated(comment) {
    this.setState({
      newComment: comment
    })
  }

  render() {
    const {classes} = this.props;
    const {loggedIn, newComment} = this.state;
    const newProps = {
      logIn: this.logIn,
      commentCreated: this.commentCreated,
      newComment: newComment,
      commentDeleted: this.commentDeleted,
      commentEdited: this.commentEdited
    };
    return (
      <div className={classes.page}>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          {!loggedIn && <SignUpDialog {...newProps} ></SignUpDialog>}
          {!loggedIn && <LogInDialog {...newProps}></LogInDialog>}
          {loggedIn && <CreateCommentDialog {...newProps}></CreateCommentDialog>}
          {loggedIn && <Button variant="outlined" color="primary" onClick={this.logOut}>Logout</Button>}
        </Toolbar>
      </AppBar>
      {/* <FeedSubscriptionData>
        {props => <Notice {...props} />}
      </FeedSubscriptionData> */}
      <FeedData newComment={newComment}>{props => <ListComments {...props} />}</FeedData>
    </div>
    );
  }
}
export default enhanced(TestPage);
