import React from 'react';
import { compose } from 'recompose';
import TimeAgo from 'react-timeago';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import { Mutation } from 'react-apollo';
import editCommentDialog from './refactor/EditCommentDialog';
import replyCommentDialog from './refactor/ReplyCommentDialog';
import { DELETECOMMENT_MUTATION } from '../utils/mutations';
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2,
    maxWidth: 400
  }
});

const enhanced = compose(
  withStyles(styles),
  // withHandlers({
  //   handleEditOpen: props => event => {
  //     const EditCommentDialog = editCommentDialog(props.message, props.isPublic, props.id);
  //     console.log(props.message, props.isPublic, props.id);
  //     EditCommentDialog();
  //     // return <EditCommentDialog></EditCommentDialog>
  //   },
  // })
);

function formatter(str, a, b, c) {
  return `${str} ${a} ${b} ${c}`;
}

export default enhanced(({
  classes,
  id,
  message,
  isPublic,
  createdAt,
  updatedAt,
  commentDeleted,
  onError,
  loggedIn,
}) => {
  const renderBtnProp = {
    renderBtn: (handleOpen) => {
      return <IconButton onClick={handleOpen}><EditIcon /></IconButton>
    }
  };
  const replyBtnProp = {
    renderBtn: (handleOpen) => {
      return <IconButton onClick={handleOpen}><ReplyIcon /></IconButton>
    }
  };
  const EditCommentDialog = editCommentDialog(message, isPublic, id, renderBtnProp);
  const ReplyCommentDialog = replyCommentDialog(message, isPublic, id, replyBtnProp);
  return (
  <Card className={classes.card}>
    <CardContent>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            {isPublic ? 'P' : ''}
            </Avatar>
        }
        action={
          <div>
            {loggedIn && <Mutation mutation={DELETECOMMENT_MUTATION} onCompleted={commentDeleted} onError={onError} variables={{ id }}>
              {mutation =>
                <IconButton onClick={mutation}>
                  <DeleteIcon />
                </IconButton>
              }
            </Mutation>}
            {loggedIn && <EditCommentDialog></EditCommentDialog>}
          </div>
        }
        title=""
        subheader=""
      />
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        <TimeAgo date={createdAt} formatter={formatter.bind(this, "created")}/>
        <TimeAgo date={updatedAt} formatter={formatter.bind(this, "/updated")}/>
      </Typography>
      <Typography variant="h5" component="h2">
        {message}
        {loggedIn && <ReplyCommentDialog renderBtn={replyBtnProp} parentCommentId={id} message={message} isPublic={!!isPublic}/>}
      </Typography>
    </CardContent>
  </Card>)
});
