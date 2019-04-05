import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import FeedData from '../containers/FeedData';
import FeedSubscriptionData from '../containers/FeedSubscriptionData';
import Notice from './Notice';
import ListComments from './ListComments';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SignUpDialog from './SignUpDialog';
import LogInDialog from './LogInDialog';
// import CreateCommentDialog from './CreateCommentDialog';
import {AUTH_TOKEN} from '../utils/constants';
import CreateCommentDialog from './refactor/CreateCommentDialog';
// import EditCommentDialog from './refactor/EditCommentDialog';
// import CommentDialog from './refactor/CommentDialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
  },
  fab: {
    position: 'absolute',
    bottom: 0,
    // bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

const enhanced = compose(withStyles(styles));

class TestPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: {},
      newComment: {},
      deletedCommentId: '',
    };
    //TODO: read JWT token
  }

  commentDeleted = (obj) => {
    this.setState({
      deletedCommentId: obj.deleteComment.id,
      newComment: {},
    });
  }

  commentEdited(id, message, isPublic) {

  }

  onError = (msg) => {
    window.alert(msg);
  }

  logIn = (value) => {
    if(value && value.user) {
      this.setState({
        loggedIn: true,
        user: value.user
      });
    }
    if(value && value.token) {
      localStorage.setItem(AUTH_TOKEN, value.token);
    }
  }

  logOut = () => {
    this.setState({
      loggedIn: false,
      user: {}
    });
    localStorage.removeItem(AUTH_TOKEN);
  }

  commentCreated = (comment) => {
    this.setState({
      newComment: comment,
      deletedCommentId: '',
    })
  }

  render() {
    const {classes} = this.props;
    const {loggedIn, newComment, deletedCommentId, user} = this.state;
    // const EditDialog = EditCommentDialog('message', true);
    const newProps = {
      logIn: this.logIn,
      commentCreated: this.commentCreated,
      newComment: newComment,
      deletedCommentId: deletedCommentId,
      commentDeleted: this.commentDeleted,
      commentEdited: this.commentEdited,
      onError: this.onError,
      loggedIn: loggedIn,
      user: user
    };
    const renderBtnProp = {
      renderBtn: (handleOpen) => {
        return (<Fab className={classes.fab} color="primary" onClick={handleOpen}>
              <AddIcon />
            </Fab>);
      }
    }
    const createCommentDialogProps = Object.assign({}, newProps, renderBtnProp)
    /*
    TODO: better colors/styles for comment box
    */
    return (
      <div className={classes.page}>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          {/* <EditDialog></EditDialog> */}
          {!loggedIn && <SignUpDialog {...newProps}></SignUpDialog>}
          {!loggedIn && <LogInDialog {...newProps}></LogInDialog>}
          {loggedIn &&  <CreateCommentDialog {...createCommentDialogProps}></CreateCommentDialog>}
          {loggedIn && <Button variant="outlined" color="primary" onClick={this.logOut}>Logout</Button>}
        </Toolbar>
      </AppBar>
      <FeedSubscriptionData>
        {props => <Notice {...props} />}
      </FeedSubscriptionData>
      <FeedData {...newProps}>{props => <ListComments {...props} />}</FeedData>
    </div>
    );
  }
}
export default enhanced(TestPage);
