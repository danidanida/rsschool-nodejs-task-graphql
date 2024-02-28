import { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLFloat } from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLString) }, // Assuming ID is a non-nullable string
      name: { type: new GraphQLNonNull(GraphQLString) }, // Assuming Name is a non-nullable string
      balance: { type: new GraphQLNonNull(GraphQLFloat) }, // Assuming Balance is a non-nullable float
    }),
  });

const rootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        users: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
            resolve: async (parent, args, context) => {
                // Access Prisma from the context
                return await context.prisma.user.findMany();
              },
        },
        posts: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
            resolve: async (parent, args, context) => {
                // Access Prisma from the context
                return await context.prisma.post.findMany();
              },
        },
        profiles: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Profile))),
            resolve: async (parent, args, context) => {
                // Access Prisma from the context
                return await context.prisma.profile.findMany();
              },
        },
        memberTypes: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
            resolve: async (parent, args, context) => {
                // Access Prisma from the context
                return await context.prisma.memberType.findMany();
              },
        },
    },
});

const rootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {}
})

const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation,
})

export default schema;