export const fetchMyConversations: string = `
query Query {
    myConversations {
      id
      user1Id
      lastMessageAt
      unreadCount
      messages {
        content
      }
      createdAt
      updatedAt
      deletedAt
    }
  }`;
