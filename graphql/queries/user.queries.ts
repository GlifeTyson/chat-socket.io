export const fetchMe: string = `
query Query {
  Me {
    id
    profilePicture
    username
  }
}
`;

export const fetchUsersWithOutLoggedUser = `
query UsersWithOutLoggedUser {
  usersWithOutLoggedUser {
    id
    username
    fullName
    gender
    profilePicture
  }
}
`;
