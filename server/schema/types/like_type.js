const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;

const LikeType = new GraphQLObjectType({
  name: "LikeType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    user: { type: GraphQLID },
    dogIds: { type: GraphQLList(GraphQLID) }
  })
});

module.exports = LikeType;