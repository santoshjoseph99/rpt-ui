import React, { Fragment } from 'react';
import { compose, withState, withHandlers } from 'recompose';
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
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classnames from 'classnames';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from './Loading';

const GET_COMMENT = gql`
  query GetComment($id:ID!){
    comment(id:$id){
      id,
      message,
      isPublic,
      createdAt,
      updatedAt,
      author{
        id,
        name
      },
      parent {
        id
      },
      children {
        id
      }
    }
  }
`;

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2,
    maxWidth: 400,
    boxShadow: "3px 3px 3px darkgrey",
    "&:hover": {
      transform: "scale(1.01)"
    },
    borderLeft: "darkgray solid 1px",
    borderTop: "darkgray solid 1px",
  },
  button: {
    display: 'inline'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  multilineEllipsis: {
    position: 'relative'
  },
  'multilineEllipsis::after': {
    background: 'inherit',
    bottom: 0,
    content: '...',
    marginRight: 1.0,
    position: 'absolute',
    right: 0,
    textAlign: 'right',
    width: 1,
  },
  truncate: {
    'line-clamp': 2,
  }
});

const enhanced = compose(
  withStyles(styles),
  withState('expanded', 'setExpanded', false),
  withHandlers({
    handleExpandClick: props => event => props.setExpanded(!props.expanded)
  })
);

function formatter(str, a, b, c) {
  return `${str} ${a} ${b} ${c}`;
}

export default enhanced(({
  classes,
  id,
  message,
  isPublic,
  children,
  createdAt,
  updatedAt,
  commentDeleted,
  onError,
  loggedIn,
  expanded,
  handleExpandClick,
  createComment,
  commentReplied,
}) => {
  const renderBtnProp = {
    renderBtn: (handleOpen) => {
      return <IconButton onClick={handleOpen}><EditIcon color="primary"/></IconButton>
    }
  };
  const replyBtnProp = {
    renderBtn: (handleOpen) => {
      return <IconButton onClick={handleOpen}><ReplyIcon color="action"/></IconButton>
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
          title=""
          subheader=""
        />
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          <TimeAgo date={createdAt} formatter={formatter.bind(this, "created")}/>
          <TimeAgo date={updatedAt} formatter={formatter.bind(this, "/updated")}/>
        </Typography>
        <Typography variant="body1" component="h5" className={classes.truncate}>
          {message}
        </Typography>
        {loggedIn &&
          <Fragment>
            <ReplyCommentDialog className={classes.button} commentReplied={commentReplied} renderBtn={replyBtnProp} parentCommentId={id} message={message} isPublic={!!isPublic}/>
            <Mutation mutation={DELETECOMMENT_MUTATION} onCompleted={commentDeleted} onError={onError} variables={{ id }}>
              {mutation =>
                <IconButton className={classes.button} onClick={mutation}>
                  <DeleteIcon color="secondary" />
                </IconButton>
            }
            </Mutation>
            <EditCommentDialog className={classes.button}></EditCommentDialog>
            {
              children && children.length > 0 &&
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            }
          </Fragment>
        }
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        {
          children && children.map(c =>
            <Query key={c.id} query={GET_COMMENT} variables={{ id: c.id }}>
              {({ loading, error, data }) => {
                if (loading) return <Loading></Loading>;
                if (error) return `Error!: ${error}`;
                const d = Object.assign({}, data.comment, {
                  commentDeleted,
                  onError,
                  loggedIn,
                  expanded,
                  handleExpandClick,
                  commentReplied,
                  createComment
                });
                return createComment(d);
              }}
            </Query>
          )
        }
        </Collapse>
      </CardContent>
    </Card>
  );
});
