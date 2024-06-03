export const loginQuery = `
    mutation Mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    success
    message
    token
  }
}
`;
export const signupQuery = `
mutation CreateUser($input: NewUserInput!) {
  createUser(input: $input) {
    message
    success
    user {
      id
      password
      username
      fullName
      gender
      profilePicture
    }
  }
}`;
