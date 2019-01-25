import { buildSchemaSync } from 'type-graphql';
import resolvers from './resolvers';

export default buildSchemaSync({
  resolvers,
});
