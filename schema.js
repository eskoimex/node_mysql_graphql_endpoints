const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID
    name: String
    email: String
    orders: [Order]
  }

  type Order {
    id: ID
    total: Float
    userId: ID
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  input CreateOrderInput {
    total: Float!
    userId: ID!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    createOrder(input: CreateOrderInput!): Order
  }

  type Query {
    getUser(id: ID!): User
    getUserOrders(userId: ID!): [Order]
  }
`);

module.exports = schema;
