import React, { Fragment } from 'react';
import Comment from './Comment';
import { compose, withProps } from 'recompose';
import renderWhileLoading from '../utils/renderWhileLoading';

const ListComments = ({comments, newComment, deletedCommentId, commentDeleted, onError, commentEdited}) => {
  console.log('ListComments:', newComment, comments.length);
  let newcomments;
  if(deletedCommentId) {
    const index = comments.findIndex(x => x.id === deletedCommentId);
    comments.splice(index, 1);
    newcomments = comments;
  } else {
    newcomments = Object.keys(newComment).length === 0 ? comments : [newComment, ...comments];
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
