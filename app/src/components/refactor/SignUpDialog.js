import { withState, withHandlers, withProps, compose } from 'recompose';
import UserDialog from './UserDialog';
import SignUpDialogFieldHandlers from './SignupDialogFieldHandlers';
import { SIGNUP_MUTATION } from '../../utils/mutations'

const enhance = compose(
  withState('open', 'setOpen', false),
  withHandlers({
    handleOpen: props => event => props.setOpen(true),
    handleClose: props => event => props.setOpen(false),
    mutationDone: props => (data) => {
      props.setOpen(false);
      props.userDone(data.signup);
    },
    mutationError: props => err => window.alert(err)
  }),
  SignUpDialogFieldHandlers,
  withProps({
    mutationFn: SIGNUP_MUTATION,
    mutationButtonText: 'Sign Up',
    dialogTitle: 'Sign Up',
    dialogContentText: 'Sign up for an account so you can add comments.',
  })
);

export default enhance(UserDialog);