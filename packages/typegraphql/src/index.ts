import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import schema from './schema';

async function main() {
  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen();

  console.log(`\n\tLive at ${url}`);
}

main();
