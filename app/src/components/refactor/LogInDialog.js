import { withState, withHandlers, withProps, compose } from 'recompose';
import UserDialog from './UserDialog';
import LogInDialogFieldHandlers from './LogInDialogFieldHandlers';
import { LOGIN_MUTATION } from '../../utils/mutations'

const enhance = compose(
  withState('open', 'setOpen', false),
  withHandlers({
    handleOpen: props => event => props.setOpen(true),
    handleClose: props => event => props.setOpen(false),
    mutationDone: props => (data) => {
      props.setOpen(false);
      props.userDone(data.login);
    },
    mutationError: props => err => window.alert(err)
  }),
  LogInDialogFieldHandlers,
  withProps({
    mutationFn: LOGIN_MUTATION,
    mutationButtonText: 'Log In',
    dialogTitle: 'Log In',
  })
);

export default enhance(UserDialog);