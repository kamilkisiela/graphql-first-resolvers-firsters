import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root,
} from 'type-graphql';
import {
  findChats,
  findChatById,
  addMessageToChat,
  findUserById,
  Message as DbMessage,
  Chat as DbChat,
} from '@app/database';
import { Chat, Message, MessageInput } from './type-defs';

@Resolver(_ => Chat)
export class ChatResolver {
  @Query(_ => [Chat], { nullable: true })
  chats() {
    return findChats();
  }

  @Query(_ => Chat, { nullable: true })
  chat(@Arg('id') id: string) {
    // <-- I could use here `number` and we wouldn't catch it :(
    return findChatById(id);
  }

  @FieldResolver()
  recentMessage(@Root() chat: DbChat) {
    // <-- I need to add DbChat and remember to keep it here and in every similar resolver :(
    const last = chat.messages.length - 1;
    return chat.messages[last];
  }

  @FieldResolver() // <!-- when I forget to add decorator there's no error
  members(@Root() chat: DbChat) {
    return chat.members.map(id => findUserById(id)!);
  }
}

@Resolver(_ => Message)
export class MessageResolver {
  @Mutation(_ => Message)
  newMessage(
    @Arg('id')
    id: string,
    @Arg('input', _ => MessageInput)
    input: {
      recipient: string;
      text: string;
    },
  ) {
    const chat = findChatById(id)!;
    const senderId = chat.members.find(id => id !== input.recipient)!;

    const message = addMessageToChat({
      chatId: chat.id,
      text: input.text,
      recipientId: input.recipient,
      senderId,
    });

    return message;
  }
  
  @FieldResolver()
  sender(@Root() message: DbMessage) {
    return findUserById(message.sender)!;
  }

  @FieldResolver()
  recipient(@Root() message: DbMessage) {
    return findUserById(message.recipient)!;
  }
}

export default [ChatResolver, MessageResolver];
