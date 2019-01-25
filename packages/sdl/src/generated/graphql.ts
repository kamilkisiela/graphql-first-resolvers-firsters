export type Maybe<T> = T | null;

export interface MessageInput {
  text: string;

  recipient: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  chats?: Maybe<(Maybe<Chat>)[]>;

  chat?: Maybe<Chat>;
}

export interface Chat {
  id: string;

  members: User[];

  messages?: Maybe<(Maybe<Message>)[]>;

  recentMessage?: Maybe<Message>;
}

export interface User {
  id: string;

  name: string;
}

export interface Message {
  id: string;

  createdAt: string;

  text: string;

  sender: User;

  recipient: User;
}

export interface Mutation {
  newMessage?: Maybe<Message>;
}

// ====================================================
// Arguments
// ====================================================

export interface ChatQueryArgs {
  id: string;
}
export interface NewMessageMutationArgs {
  id: string;

  input: MessageInput;
}

import { GraphQLResolveInfo } from "graphql";

import { Message, Chat, User } from "@app/database";

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    chats?: ChatsResolver<Maybe<(Maybe<Chat>)[]>, TypeParent, Context>;

    chat?: ChatResolver<Maybe<Chat>, TypeParent, Context>;
  }

  export type ChatsResolver<
    R = Maybe<(Maybe<Chat>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ChatResolver<
    R = Maybe<Chat>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, ChatArgs>;
  export interface ChatArgs {
    id: string;
  }
}

export namespace ChatResolvers {
  export interface Resolvers<Context = {}, TypeParent = Chat> {
    id?: IdResolver<string, TypeParent, Context>;

    members?: MembersResolver<User[], TypeParent, Context>;

    messages?: MessagesResolver<Maybe<(Maybe<Message>)[]>, TypeParent, Context>;

    recentMessage?: RecentMessageResolver<Maybe<Message>, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = Chat, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type MembersResolver<
    R = User[],
    Parent = Chat,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type MessagesResolver<
    R = Maybe<(Maybe<Message>)[]>,
    Parent = Chat,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type RecentMessageResolver<
    R = Maybe<Message>,
    Parent = Chat,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace UserResolvers {
  export interface Resolvers<Context = {}, TypeParent = User> {
    id?: IdResolver<string, TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace MessageResolvers {
  export interface Resolvers<Context = {}, TypeParent = Message> {
    id?: IdResolver<string, TypeParent, Context>;

    createdAt?: CreatedAtResolver<string, TypeParent, Context>;

    text?: TextResolver<string, TypeParent, Context>;

    sender?: SenderResolver<User, TypeParent, Context>;

    recipient?: RecipientResolver<User, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = Message, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CreatedAtResolver<
    R = string,
    Parent = Message,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type TextResolver<
    R = string,
    Parent = Message,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type SenderResolver<
    R = User,
    Parent = Message,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type RecipientResolver<
    R = User,
    Parent = Message,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    newMessage?: NewMessageResolver<Maybe<Message>, TypeParent, Context>;
  }

  export type NewMessageResolver<
    R = Maybe<Message>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, NewMessageArgs>;
  export interface NewMessageArgs {
    id: string;

    input: MessageInput;
  }
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface IResolvers<Context = {}> {
  Query?: QueryResolvers.Resolvers<Context>;
  Chat?: ChatResolvers.Resolvers<Context>;
  User?: UserResolvers.Resolvers<Context>;
  Message?: MessageResolvers.Resolvers<Context>;
  Mutation?: MutationResolvers.Resolvers<Context>;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
