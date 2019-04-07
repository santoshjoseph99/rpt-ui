import React, { Fragment } from 'react';
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
import {AUTH_USER, AUTH_TOKEN} from '../utils/constants';
import CreateCommentDialog from './refactor/CreateCommentDialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Comment from './Comment';

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
    right: theme.spacing.unit * 2,
  },
  name: {
   marginLeft: 10,
  }
});

const enhanced = compose(withStyles(styles));

class CommentPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: {},
      newComment: {},
      deletedCommentId: '',
      repliedComment: {},
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem(AUTH_USER));
    if(user) {
      this.setState({
        user
      });
    }
    const token = localStorage.getItem(AUTH_TOKEN);
    if(token){
      this.setState({
        loggedIn: true
      });
    }
  }

  commentDeleted = (obj) => {
    this.setState({
      deletedCommentId: obj.deleteComment.id,
      newComment: {},
    });
  }

  // commentEdited(id, message, isPublic) {
  // }

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
    if(value) {
      localStorage.setItem(AUTH_USER, JSON.stringify(value.user));
      localStorage.setItem(AUTH_TOKEN, value.token);
    }
  }

  logOut = () => {
    this.setState({
      loggedIn: false,
      user: {}
    });
    localStorage.removeItem(AUTH_USER);
    localStorage.removeItem(AUTH_TOKEN);
  }

  commentCreated = (comment) => {
    this.setState({
      newComment: comment,
      deletedCommentId: '',
    })
  }

  commentReplied = (comment) => {
    this.setState({
      repliedComment: comment,
    })
  }

  createComment = (comment) => {
    return <Comment key={comment.id} {...comment}></Comment>;
  }

  render() {
    const {classes} = this.props;
    const {loggedIn, newComment, deletedCommentId, user, repliedComment} = this.state;
    const newProps = {
      logIn: this.logIn,
      commentCreated: this.commentCreated,
      newComment,
      deletedCommentId,
      commentDeleted: this.commentDeleted,
      commentEdited: this.commentEdited,
      onError: this.onError,
      loggedIn,
      user,
      createComment: this.createComment,
      commentReplied: this.commentReplied,
      repliedComment,
    };
    const renderBtnProp = {
      renderBtn: (handleOpen) =>
        <Fab className={classes.fab} color="primary" onClick={handleOpen}><AddIcon /></Fab>
    }
    const createCommentDialogProps = Object.assign({}, newProps, renderBtnProp)
    /*
    TODO: multiple loading indictors for child comments on expansion
    TODO: replying does not show the new comment!
    TODO: truncate comment length
    TODO: combine signup & login dialogs
    TODO: dialog forms valiation only enable action if dialogbox is filled out
    TODO: show errors on dialog box
    TODO: unit tests
    TODO: create README to describe choices and architecture
    TODO: redux (or unistore)
    TODO: pagination
    */

    return (
      <div className={classes.page}>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            {!loggedIn &&
              <Fragment>
                <SignUpDialog {...newProps}></SignUpDialog>
                <LogInDialog {...newProps}></LogInDialog>
              </Fragment>
            }
            {loggedIn &&
              <Fragment>
                <Button variant="outlined" color="primary" onClick={this.logOut}>Logout</Button>
                <span className={classes.name}>Hi {user.name}</span>
                <CreateCommentDialog {...createCommentDialogProps}></CreateCommentDialog>
              </Fragment>
            }
          </Toolbar>
        </AppBar>
        <FeedSubscriptionData>
          {props => <Notice {...props} />}
        </FeedSubscriptionData>
        <FeedData {...newProps}>
          {props => <ListComments {...props} />}
        </FeedData>
      </div>
    );
  }
}
export default enhanced(CommentPage);