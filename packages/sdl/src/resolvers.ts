import {
  findChats,
  findChatById,
  addMessageToChat,
  findUserById,
} from '@app/database';
import {
  QueryResolvers,
  MutationResolvers,
  ChatResolvers,
  MessageResolvers,
} from './generated/graphql';

const Query: QueryResolvers.Resolvers = {
  chats() {
    return findChats();
  },
  chat(_, { id }) {
    return findChatById(id)!;
  },
};

const Mutation: MutationResolvers.Resolvers = {
  newMessage(_, { id, input }) {
    const chat = findChatById(id)!;
    const senderId = chat.members.find(id => id !== input.recipient)!;

    const message = addMessageToChat({
      chatId: chat.id,
      text: input.text,
      recipientId: input.recipient,
      senderId,
    });

    return message;
  },
};

const Chat: ChatResolvers.Resolvers = {
  recentMessage(chat) {
    const last = chat.messages.length - 1;
    return chat.messages[last];
  },
  members(chat) {
    return chat.members.map(id => findUserById(id)!);
  },
};

const Message: MessageResolvers.Resolvers = {
  sender(message) {
    return findUserById(message.sender)!;
  },
  recipient(message) {
    return findUserById(message.recipient)!;
  },
};

export default {
  Query,
  Mutation,
  Chat,
  Message,
};
