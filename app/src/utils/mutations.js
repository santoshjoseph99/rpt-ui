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
      },
      children {
        id,
      },
      parent {
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

export const SIGNUP_MUTATION = gql`
mutation PostMutation($email: String!, $password: String!, $name:String!) {
  signup(email: $email, password:$password, name:$name) {
    token,
    user {
      id,
      email,
      name
    }
  }
}
`;

export const LOGIN_MUTATION = gql`
mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password:$password) {
    token,
    user {
      id,
      email,
      name
    }
  }
}
`;