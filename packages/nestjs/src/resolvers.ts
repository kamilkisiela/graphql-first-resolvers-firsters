import {
  findChats,
  findChatById,
  findUserById,
  addMessageToChat,
  Chat as DbChat,
  Message as DbMessage,
} from '@app/database';
import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
} from '@nestjs/graphql';

@Resolver('Chat')
export class ChatResolver {
  @Query()
  chats() {
    return findChats();
  }

  @Query()
  chat(@Args('id') id: string) {
    // <-- I could use here `number` and we wouldn't catch it :(
    return findChatById(id);
  }

  @ResolveProperty()
  recentMessage(@Parent() chat: DbChat) {
    // <-- I need to add DbChat and remember to keep it here and in every similar resolver :(
    const last = chat.messages.length - 1;
    return chat.messages[last];
  }

  @ResolveProperty() // <!-- when I forget to add decorator there's no error
  members(@Parent() chat: DbChat) {
    return chat.members.map(id => findUserById(id)!);
  }
}

@Resolver('Message')
export class MessageResolver {
  @Mutation()
  newMessage(
    @Args('id')
    id: string,
    @Args('input')
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

  @ResolveProperty()
  sender(@Parent() message: DbMessage) {
    return findUserById(message.sender)!;
  }

  @ResolveProperty()
  recipient(@Parent() message: DbMessage) {
    return findUserById(message.recipient)!;
  }
}
