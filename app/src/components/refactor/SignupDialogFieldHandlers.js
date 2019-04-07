import { withStateHandlers } from 'recompose';

const onChangeEmail = props => event => ({
  email: {
    value: event.target.value,
    isDirty: true
  }
});

const onChangePassword = props => event => ({
  password: {
    value: event.target.value,
    isDirty: true
  }
});

const onChangeName = props => event => ({
  name: {
    value: event.target.value,
    isDirty: true
  }
});

export default withStateHandlers(
  {
    email: { value: ''},
    password: { value: ''},
    name: { value: ''}
  },
  {
    onChangeEmail,
    onChangePassword,
    onChangeName,
  }
);