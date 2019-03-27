import React from 'react';
import { compose } from 'recompose';
import TimeAgo from 'react-timeago';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplyIcon from '@material-ui/icons/Reply';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import EditCommentDialog from './EditCommentDialog';

const DELETECOMMENT_MUTATION = gql`
mutation DeleteComment($id: ID!) {
  deleteComment(id:$id){
    id,
  	message
  }
}
`;

const EDITCOMMENT_MUTATION = gql`
mutation EditComment($id: ID!, $message:String, $isPublic: Boolean) {
  editComment(id:$id, message:$message, isPublic:$isPublic){
    id,
  	message,
    isPublic
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

export default enhanced(({ classes, id, message, isPublic, createdAt, updatedAt, commentDeleted, onError }) => {
  // console.log('ID:', id);
  return (<Card className={classes.card}>
    <CardContent>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            R
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
            <EditCommentDialog message={message} isPublic={isPublic}/>
          </div>
        }
        title="updated"
        subheader="created September 14, 2016"
      />
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        <TimeAgo date={createdAt} />
      </Typography>
      <Typography variant="h5" component="h2">
        {message}
        <IconButton onClick={() => console.log('reply')}><ReplyIcon /></IconButton>
      </Typography>
    </CardContent>
  </Card>)
});
