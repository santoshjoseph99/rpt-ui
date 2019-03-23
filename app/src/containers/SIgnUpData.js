import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withProps, toRenderProps } from 'recompose';

const mutation = gql`
  mutation signup {
      signup(email:"email@email.com", password:"abcdef",name:"sj"){
      user {
        email,
        name
      }
      token,
    }
  }
`;

const enhanced = compose(
  graphql(query),
  withProps(({ data: { loading, feed } }) => ({
    loading: loading,
    comments: feed
  }))
);

export default toRenderProps(enhanced);
