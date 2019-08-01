const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    description: { type: GraphQLString },
    zipcode: { type: GraphQLInt},
    willTravel: { type: GraphQLString },
    hasChildren: { type: GraphQLBoolean },
    hasDogs: { type: GraphQLBoolean },
    hasCats: { type: GraphQLBoolean },
    likedSizes: { type: new GraphQLList(GraphQLString) },
    likedGenders: { type: new GraphQLList(GraphQLString) },
    likedAges: { type: new GraphQLList(GraphQLString) },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean }
  })
});

module.exports = UserType;