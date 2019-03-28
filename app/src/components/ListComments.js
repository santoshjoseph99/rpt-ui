import React, { Fragment } from 'react';
import Comment from './Comment';
import { compose } from 'recompose';
import renderWhileLoading from '../utils/renderWhileLoading';

const ListComments = ({comments,user, newComment, deletedCommentId, commentDeleted, onError, commentEdited}) => {
  let newcomments;
  if(deletedCommentId) {
    const index = comments.findIndex(x => x.id === deletedCommentId);
    comments.splice(index, 1);
    newcomments = comments;
  } else {
    newcomments = Object.keys(newComment).length === 0 ? comments : [newComment, ...comments];
  }
  if (user.id) {
    newcomments = newcomments.filter(x => x.isPublic || x.author.id === user.id);
  } else {
    newcomments = newcomments.filter(x => x.isPublic);
  }
  return (
  <Fragment>
    {newcomments &&
      newcomments.map(
      comment => {
        const newProps = Object.assign({}, {commentDeleted, onError, commentEdited}, comment);
        return <Comment key={comment.id} { ...newProps} />})
        }
  </Fragment>);
};

export default compose(renderWhileLoading)(ListComments);
