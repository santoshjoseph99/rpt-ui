import gql from 'graphql-tag';

export const CREATECOMMENT_MUTATION = gql`
  mutation CreateCommentMutation(
    $message: String!,
    $isPublic: Boolean!,
    $parentCommentId:ID) {
    createComment(message: $message, isPublic:$isPublic, parentCommentId: $parentCommentId) {
      id,
      createdAt,
      updatedAt,
      message,
      author {
        name
      }
    }
  }
`;

export const EDITCOMMENT_MUTATION = gql`
  mutation EditComment(
    $id: ID!,
    $message:String,
    $isPublic: Boolean) {
    editComment(id:$id, message:$message, isPublic:$isPublic){
      id,
      message,
      isPublic
    }
  }
`;
