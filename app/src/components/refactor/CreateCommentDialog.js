import { withState, withHandlers, withProps, compose } from 'recompose';
import CommentDialog from './CommentDialog';
import CommentDialogFieldHandlers from './CommentDialogFieldHandlers';
import { CREATECOMMENT_MUTATION } from '../../utils/mutations'


const enhance = compose(
  withState('open', 'setOpen', false),
  withHandlers({
    handleClose: props => event => props.setOpen(false),
    mutationDone: props => (data) => {
      props.setOpen(false);
      props.commentCreated(data.createComment);
    },
    mutationError: props => err => window.alert(err)
  }),
  CommentDialogFieldHandlers('', false),
  withProps({
    mutationFn: CREATECOMMENT_MUTATION,
    mutationButtonText: 'Create',
    dialogTitle: 'New Comment'
  })
);

export default enhance(CommentDialog);