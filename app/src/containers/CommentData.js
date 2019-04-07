import gql from "graphql-tag";
import { graphql } from 'react-apollo';
// import { Query } from "react-apollo";
import { compose, withProps, toRenderProps } from 'recompose';

const GET_COMMENT = gql`
  query GetComment($id:ID!){
    comment(id:$id){
      id,
      message,
      isPublic,
      createdAt,
      updatedAt,
      author{
        id,
        name
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
  graphql(GET_COMMENT),
  withProps(({ data: { loading, comment} }) => ({
    loading,
    comment
  }))
);

export default toRenderProps(enhanced);