import { withState, withHandlers, withProps, compose } from 'recompose';
import CommentDialog from './CommentDialog';
import CommentDialogFieldHandlers from './CommentDialogFieldHandlers';
import { EDITCOMMENT_MUTATION } from '../../utils/mutations'

const enhanceFn = function (message, isPublic, id){
  return compose(
    withState('open', 'setOpen', true),
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
      id: id,
      buttonText: 'Edit Comment',
      mutationFn: EDITCOMMENT_MUTATION,
      mutationButtonText: 'Save',
      dialogTitle: 'Edit Comment'
    })
  );
}

export default function (message, isPublic, id) {
  const enhance = enhanceFn(message, isPublic, id);
  return enhance(CommentDialog);
}