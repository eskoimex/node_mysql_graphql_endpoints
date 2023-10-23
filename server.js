const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const { User, Order, sequelize } = require("./models");

// Define the resolvers
const root = {
  // Retrieve user information by ID
  user: async ({ id }) => {
    return await User.findByPk(id);
  },
  // Retrieve a user's orders
  orders: async ({ userId }) => {
    return await Order.findAll({ where: { userId } });
  },
  // Create a new user
  createUser: async ({ input }) => {
    try {
      const user = await User.create(input);
      return user;
    } catch (error) {
      throw new Error("Failed to create user");
    }
  },
  // Create a new order for a user

  createOrder: async ({ input }) => {
    try {
      const user = await User.findByPk(input.userId);
      if (!user) {
        throw new Error("User not found");
      }

      const order = await Order.create(input);
      return order;
    } catch (error) {
      throw new Error("Failed to create order");
    }
  },
};

// Set up the GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  sequelize.sync(); // Sync the database models
});
