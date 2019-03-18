const createComment = (message, public) => `
    mutation {
        createComment(message: "${message}", isPublic: ${public}){
            id
            createdAt
            isPublic
            message
            author {
                id
                name
            }
        }
    }`;

const login = (email, password) => `
    mutation {
        login(email: "${email}", password: "${password}"){
            token
            user {
                id
                name
                email
            }
        }
    }`;

const signup = (email, password, name) => `
    mutation {
        signup(email: "${email}", password: "${password}", name: "${name}"){
            token
            user {
                id
                name
                email
            }
        }
    }`;

const comment = id => `
    {
        comment(id: "${id}") {
          id
          message
          createdAt
        }
    }`;

const deleteComment = id => `
    mutation {
        deleteComment(id: "${id}"){
           id
        }
    }`;

const editComment = (id, { message, isPublic }) => `
    mutation {
        editComment(id: "${id}", message: "${message}", isPublic: ${isPublic}){
           id
           message
           isPublic
        }
    }`;

const me = `
    {
      me {
          id
          comments {
              id
              message
          }
        }
    }`;

const feed = `
    {
       feed {
            id
            message
            createdAt
            isPublic
        }
    }`;

module.exports = {
  createComment,
  comment,
  editComment,
  deleteComment,
  signup,
  login,
  me,
  feed
};
