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
import IconButton from '@material-ui/core/IconButton';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import EditCommentDialog from './EditCommentDialog';
import ReplyCommentDialog from './ReplyCommentDialog';

const DELETECOMMENT_MUTATION = gql`
mutation DeleteComment($id: ID!) {
  deleteComment(id:$id){
    id,
  	message
  }
}
`;

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2,
    maxWidth: 400
  }
});

const enhanced = compose(withStyles(styles));

function formatter(str, a, b, c) {
  return `${str} ${a} ${b} ${c}`;
}

export default enhanced(({ classes, id, message, isPublic, createdAt, updatedAt, commentDeleted, onError }) => {
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
            <Mutation mutation={DELETECOMMENT_MUTATION} onCompleted={commentDeleted} onError={onError} variables={{ id }}>
              {mutation =>
                <IconButton onClick={mutation}>
                  <DeleteIcon />
                </IconButton>
              }
            </Mutation>
            <EditCommentDialog id={id} message={message} isPublic={!!isPublic}/>
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
        <ReplyCommentDialog parentCommentId={id} message={message} isPublic={!!isPublic}/>
      </Typography>
    </CardContent>
  </Card>)
});
