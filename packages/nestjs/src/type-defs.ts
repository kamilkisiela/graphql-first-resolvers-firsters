// ... we can't use gql`` so we miss syntax highlighting
// we can use .graphql instead
export default `
  type Query {
    chats: [Chat]
    chat(id: ID!): Chat
  }

  type Mutation {
    newMessage(id: ID!, input: MessageInput!): Message
  }

  input MessageInput {
    text: String!
    recipient: ID!
  }

  type User {
    id: ID!
    name: String!
  }

  type Message {
    id: ID!
    createdAt: String!
    text: String!
    sender: User!
    recipient: User!
  }

  type Chat {
    id: ID!
    members: [User!]!
    messages: [Message]
    recentMessage: Message
  }
`;
