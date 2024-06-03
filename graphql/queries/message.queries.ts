export const fetchMessageWithOther: string = `
query Query($userId: ID!) {
  myMessages(userId: $userId) {
    id
    receiver {
      id
      fullName
    }
    sender {
      id
      fullName
      profilePicture
    }
    content
    groupId
    conversationId
    senderId
    receiverId
    createdAt
  }
}
`;
