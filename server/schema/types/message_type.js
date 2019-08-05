const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const MessageType = new GraphQLObjectType({
  name: "MessageType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    body: { type: GraphQLString },
    conversation: { type: GraphQLID },
    author: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

module.exports = MessageType;