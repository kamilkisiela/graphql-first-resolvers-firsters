function ID() {
  return Math.random()
    .toString(16)
    .substr(2);
}

//
// Users
//

export interface User {
  id: string;
  name: string;
}

const RachelGreen = {
  id: ID(),
  name: 'Rachel Green',
};

const ChandlerBing = {
  id: ID(),
  name: 'Chandler Bing',
};

const PhoebeBuffay = {
  id: ID(),
  name: 'Phoebe Buffay',
};

const RossGeller = {
  id: ID(),
  name: 'Ross Geller',
};

const users = [RachelGreen, ChandlerBing, PhoebeBuffay, RossGeller];

//
// Messages
//

export interface Message {
  id: string;
  createdAt: Date;
  text: string;
  sender: string;
  recipient: string;
}

//
// Chats
//

export interface Chat {
  id: string;
  members: string[];
  messages: Message[];
}

const RachelWithChandler = {
  id: ID(),
  members: [RachelGreen.id, ChandlerBing.id],
  messages: [
    {
      id: ID(),
      createdAt: new Date(),
      text: 'Hi',
      sender: RachelGreen.id,
      recipient: ChandlerBing.id,
    },
    {
      id: ID(),
      createdAt: new Date(),
      text: 'Oh hi',
      sender: ChandlerBing.id,
      recipient: RachelGreen.id,
    },
  ],
};

const RachelWithPhoebe = {
  id: ID(),
  members: [RachelGreen.id, PhoebeBuffay.id],
  messages: [
    {
      id: ID(),
      createdAt: new Date(),
      text: 'Hi Phoebe',
      sender: RachelGreen.id,
      recipient: PhoebeBuffay.id,
    },
    {
      id: ID(),
      createdAt: new Date(),
      text: 'I am Princess Consuela Banana Hammock now!',
      sender: PhoebeBuffay.id,
      recipient: RachelGreen.id,
    },
  ],
};

const RachelWithRoss = {
  id: ID(),
  members: [RachelGreen.id, RossGeller.id],
  messages: [
    {
      id: ID(),
      createdAt: new Date(),
      text: 'Hi Ross',
      sender: RachelGreen.id,
      recipient: RossGeller.id,
    },
    {
      id: ID(),
      createdAt: new Date(),
      text: 'Hello Princess Leia',
      sender: RossGeller.id,
      recipient: RachelGreen.id,
    },
  ],
};

const chats = [RachelWithPhoebe, RachelWithChandler, RachelWithRoss];

export function findUserById(id: string) {
  return users.find(u => u.id === id);
}

export function findUsers() {
  return users;
}

export function findChatById(id: string) {
  return chats.find(c => c.id === id);
}

export function findChats() {
  return chats;
}

export function addMessageToChat({
  chatId,
  text,
  senderId,
  recipientId,
}: {
  chatId: string;
  text: string;
  senderId: string;
  recipientId: string;
}) {
  const sender = findUserById(senderId)!;
  const recipient = findUserById(recipientId)!;
  const chat = findChatById(chatId)!;

  const message = {
    id: ID(),
    createdAt: new Date(),
    text,
    sender: sender.id,
    recipient: recipient.id,
  };

  chat.messages.push(message);

  return message;
}
