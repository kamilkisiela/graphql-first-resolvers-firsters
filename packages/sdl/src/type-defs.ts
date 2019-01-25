import { gql } from 'apollo-server';

export default gql`
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
