import { Field, ObjectType, InputType, ID } from 'type-graphql';

@InputType()
export class MessageInput {
  @Field()
  text!: string;

  @Field(_ => ID)
  recipient!: string;
}

@ObjectType()
export class User {
  @Field(_ => ID)
  id!: string;

  @Field()
  name!: string;
}

@ObjectType()
export class Message {
  @Field(_ => ID)
  id!: string;

  @Field()
  createdAt!: Date;

  @Field()
  text!: string;

  @Field(_ => User)
  sender!: User;

  @Field(_ => User)
  recipient!: User;
}

@ObjectType()
export class Chat {
  @Field(_ => ID)
  id!: string;

  @Field(_ => [User])
  members!: User[];

  @Field(_ => [Message])
  messages!: Message[];

  @Field(_ => Message)
  recentMessage!: Message;
}
