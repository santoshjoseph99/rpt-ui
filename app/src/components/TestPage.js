import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import FeedData from '../containers/FeedData';
import FeedSubscriptionData from '../containers/FeedSubscriptionData';
import ListComments from './ListComments';
import Notice from './Notice';
// import SignUp from './SignUp';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SignUpDialog from './SignUpDialog';
import LogInDialog from './LogInDialog';

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
});

const enhanced = compose(withStyles(styles));

function signUp() {
 
}

export default enhanced(({ classes }) => (
  <div className={classes.page}>
    <AppBar position="static" color="default" className={classes.appBar}>
      <Toolbar>
        <SignUpDialog></SignUpDialog>
        <LogInDialog></LogInDialog>
        <Button>Logout</Button>
      </Toolbar>
    </AppBar>
    <FeedSubscriptionData>
      {props => <Notice {...props} />}
    </FeedSubscriptionData>
    <FeedData>{props => <ListComments {...props} />}</FeedData>
  </div>
));
