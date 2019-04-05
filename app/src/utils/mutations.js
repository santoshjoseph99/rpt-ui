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
        name,
        id
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

export const DELETECOMMENT_MUTATION = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id:$id){
      id,
      message
    }
  }
`;
