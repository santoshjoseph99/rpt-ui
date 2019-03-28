import { withState, withHandlers, withProps, compose } from 'recompose';
import gql from 'graphql-tag';
import CommentDialog from './CommentDialog';
import CommentDialogFieldHandlers from './CommentDialogFieldHandlers';

const EDITCOMMENT_MUTATION = gql`
mutation EditComment($id: ID!, $message:String, $isPublic: Boolean) {
  editComment(id:$id, message:$message, isPublic:$isPublic){
    id,
  	message,
    isPublic
  }
}
`;

const enhanceFn = function (message, isPublic){
  return compose(
  withState('open', 'setOpen', false),
  withHandlers({
    handleClick: props => event => props.setOpen(!props.open),
    createDone: props => (data) => {
      props.setOpen(!props.open);
      props.commentEdited(data.createComment);
    },
    createError: props => err => window.alert(err)
  }),
  CommentDialogFieldHandlers(message, isPublic),
  withProps({
    buttonText: 'Edit Comment',
    mutationFn: EDITCOMMENT_MUTATION,
    mutationButtonText: 'Save',
    dialogTitle: 'Edit Comment'
  })
);
}

export default function (message, isPublic) {
  const enhance = enhanceFn(message, isPublic);
  return enhance(CommentDialog);
}