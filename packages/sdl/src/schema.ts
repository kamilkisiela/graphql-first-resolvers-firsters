import { makeExecutableSchema } from 'apollo-server';
import typeDefs from './type-defs';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs,
  resolvers: resolvers as any,
});
