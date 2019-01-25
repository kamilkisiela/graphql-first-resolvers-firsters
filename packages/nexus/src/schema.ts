import { makeSchema } from 'nexus';
import * as allTypes from './resolvers';

export default makeSchema({
  types: allTypes,
  outputs: false,
});
