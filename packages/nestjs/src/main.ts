import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import typeDefs from './type-defs';
import { ChatResolver, MessageResolver } from './resolvers';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typeDefs,
    }),
  ],
  providers: [ChatResolver, MessageResolver],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  console.log('\n\tLive at http://localhost:3000/graphql');
}

bootstrap();
