import React, { Fragment } from 'react';
import Comment from './Comment';
import { compose } from 'recompose';
import renderWhileLoading from '../utils/renderWhileLoading';

const ListComments = ({ comments }) => (
  <Fragment>
    {comments &&
      comments.map(({ id, ...comment }) => <Comment key={id} {...comment} />)}
  </Fragment>
);

export default compose(renderWhileLoading)(ListComments);
