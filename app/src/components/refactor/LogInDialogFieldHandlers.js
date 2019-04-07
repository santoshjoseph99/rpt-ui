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


export default withStateHandlers(
  {
    email: { value: ''},
    password: { value: ''},
  },
  {
    onChangeEmail,
    onChangePassword,
  }
);