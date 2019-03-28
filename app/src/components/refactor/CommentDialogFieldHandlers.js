import { withStateHandlers } from 'recompose';

const onChangeMessage = props => event => ({
  message: {
    value: event.target.value,
    isDirty: true
  }
});

const onChangeIsPublic = props => event => ({
  isPublic: {
    value: event.target.checked,
    isDirty: true
  }
});

export default (message = '', isPublic = true) => withStateHandlers(
  {
    message: { value: message },
    isPublic: { value: isPublic }
  },
  {
    onChangeMessage,
    onChangeIsPublic
  });