import { withState, withHandlers, withProps, compose } from 'recompose';
import CommentDialog from './CommentDialog';
import CommentDialogFieldHandlers from './CommentDialogFieldHandlers';
import { EDITCOMMENT_MUTATION } from '../../utils/mutations'

const enhanceFn = function (message, isPublic, id, renderBtnProp){
  return compose(
    withState('open', 'setOpen', false),
    withHandlers({
      handleOpen: props => event => props.setOpen(true),
      handleClose: props => event => props.setOpen(false),
      mutationDone: props => (data) => {
        props.setOpen(!props.open);
        // props.commentEdited(data.createComment);
      },
      mutationError: props => err => window.alert(err)
    }),
    CommentDialogFieldHandlers(message, isPublic),
    withProps({
      renderBtn: renderBtnProp.renderBtn,
      id: id,
      mutationFn: EDITCOMMENT_MUTATION,
      mutationButtonText: 'Save',
      dialogTitle: 'Edit Comment'
    })
  );
}

export default function (message, isPublic, id, renderBtnProp) {
  const enhance = enhanceFn(message, isPublic, id, renderBtnProp);
  return enhance(CommentDialog);
}