import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import schema from './schema.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/graphql',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const result = await graphql({
        schema, // Your GraphQL schema
        source: query,
        variableValues: variables,
        contextValue: { prisma: fastify.prisma }, 
      });

      return result;
    },
  });
};

export default plugin;
