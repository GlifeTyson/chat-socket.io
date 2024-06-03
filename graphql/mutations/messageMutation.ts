export const sendMessageQuery = `
mutation Mutation($content: String!, $groupId: ID, $receiverId: ID, $conversationId: ID) {
    sendMessage(content: $content, groupId: $groupId, receiverId: $receiverId, conversationId: $conversationId) {
      errors {
        message
      }
      message
      success
    }
  }`;
