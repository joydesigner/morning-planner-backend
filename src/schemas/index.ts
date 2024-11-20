import { buildSchema } from "graphql";

// Define GraphQL schema
const schema = buildSchema(`
  type User {
    id: ID!
    profileName: String!
    email: String!
    password: String!
  }

  type Query {
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(profileName: String!, email: String!, password: String!): User
  }
`);

export default schema;