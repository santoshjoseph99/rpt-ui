import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withProps, toRenderProps } from 'recompose';

const query = gql`
  query feed {
    feed {
      id
      message
      createdAt
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
