import React, { Fragment } from 'react';
import Comment from './Comment';
import { compose } from 'recompose';
import renderWhileLoading from '../utils/renderWhileLoading';

function removeComment(comments, id) {
  const index = comments.findIndex(x => x.id === id);
  if(index > -1) {
    comments.splice(index, 1);
    return true;
  }
  for(let i  = 0; i < comments.length; i++) {
    if(removeComment(comments[i].children, id)){
      return true;
    }
  }
  return false;
}

function addChildComment(comments, childComment, parentId) {
  const index = comments.findIndex(x => x.id === parentId);
  if(index > -1) {
    comments[index].children.unshift(childComment);
    return true;
  }
  for(let i  = 0; i < comments.length; i++) {
    if(comments[i].children && addChildComment(comments[i].children, childComment, parentId)){
      return true;
    }
  }
  return false;
}

const ListComments = ({
  comments,
  user,
  newComment,
  deletedCommentId,
  commentDeleted,
  onError,
  commentEdited,
  createComment,
  loggedIn,
  commentReplied,
  repliedComment,
  }) => {
  let newcomments;
  if(deletedCommentId) {
    removeComment(comments, deletedCommentId)
    newcomments = comments;
  } else if(repliedComment.id) {
    addChildComment(comments, repliedComment, repliedComment.parent.id);
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
        const newProps = Object.assign({}, {commentReplied, createComment, commentDeleted, onError, commentEdited, loggedIn}, comment);
        return <Comment key={comment.id} { ...newProps} />})
        }
  </Fragment>);
};

export default compose(renderWhileLoading)(ListComments);
