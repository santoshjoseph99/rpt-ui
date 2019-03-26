import React, { Fragment } from 'react';
import Comment from './Comment';
import { compose } from 'recompose';
import renderWhileLoading from '../utils/renderWhileLoading';

const ListComments = ({comments, newComment}) => {
  // console.log('ListComments:', newComment, comments);
  const newcomments = Object.keys(newComment).length === 0 ? comments : [newComment, ...comments];
  return (
  <Fragment>
    {newcomments &&
      newcomments.map(comment => <Comment key={comment.id} { ...comment} />)}
  </Fragment>);
};

export default compose(renderWhileLoading)(ListComments);
