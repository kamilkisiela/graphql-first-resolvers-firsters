import { objectType, inputObjectType, idArg, arg } from 'nexus';

export const MessageInput = inputObjectType('MessageInput', t => {
  t.string('text');
  t.id('recipient');
});

export const User = objectType('User', t => {
  t.id('id');
  t.string('name');
});

export const Message = objectType('Message', t => {
  t.id('id');
  t.string('createdAt');
  t.string('text');
  t.field('sender', 'User'); // <!-- it tells me 'User' does not exists, even though I defined it
  t.field('recipient', 'User');
});

export const Chat = objectType('Chat', t => {
  t.id('id');
  t.field('members', 'User', {
    list: true,
    resolve() {},
  });
  t.field('messages', 'Message', {
    list: true,
  });
  t.field('recentMessage', 'Message');
});

export const Query = objectType('Query', t => {
  t.field('chats', 'Chat', {
    nullable: true,
  });

  t.field('chat', 'Chat', {
    nullable: true,
  });
});

export const Mutation = objectType('Mutation', t => {
  t.field('newMessage', 'Message', {
    args: {
      id: idArg({
        required: true,
      }),
      input: arg('MessageInput', {
        required: true,
      }),
    },
  });
});
