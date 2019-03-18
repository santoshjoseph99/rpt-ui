import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withProps, toRenderProps } from 'recompose';

const query = gql`
  subscription {
    feedSubscription {
      mutation
      node {
        id
        message
        updatedAt
      }
      previousValues {
        id
        message
      }
    }
  }
`;

const enhanced = compose(
  graphql(query),
  withProps(({ data: { feedSubscription } }) => {
    if (!feedSubscription) {
      return;
    }

    const { mutation, previousValues, node } = feedSubscription;
    const values = mutation === 'DELETED' ? previousValues : node;

    return { ...values, mutation };
  })
);

export default toRenderProps(enhanced);
