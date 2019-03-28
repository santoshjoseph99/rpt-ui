import { withState, withHandlers, withProps, compose } from 'recompose';
import gql from 'graphql-tag';
import CommentDialog from './CommentDialog';
import CommentDialogFieldHandlers from './CommentDialogFieldHandlers';

const CREATECOMMENT_MUTATION = gql`
mutation CreateCommentMutation($message: String!,
  $isPublic: Boolean!,
	$parentCommentId:ID) {
  createComment(message: $message, isPublic:$isPublic, parentCommentId: $parentCommentId) {
  	id,
    createdAt,
    updatedAt,
    message,
    author {
    	name
    }
  }
}
`;

const enhance = compose(
  withState('open', 'setOpen', false),
  withHandlers({
    handleClick: props => event => props.setOpen(!props.open),
    createDone: props => (data) => {
      props.setOpen(!props.open);
      props.commentCreated(data.createComment);
    },
    createError: props => err => window.alert(err)
  }),
  CommentDialogFieldHandlers(),
  withProps({
    buttonText: 'New Comment',
    mutationFn: CREATECOMMENT_MUTATION,
    mutationButtonText: 'Create',
    dialogTitle: 'New Comment'
  })
);

export default enhance(CommentDialog);