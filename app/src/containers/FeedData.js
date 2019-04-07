import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withProps, toRenderProps } from 'recompose';

const query = gql`
  query feed {
    feed {
      id
      isPublic
      message
      createdAt
      updatedAt
      author {
        id
      },
      parent {
        id
      },
      children {
        id
      }
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
