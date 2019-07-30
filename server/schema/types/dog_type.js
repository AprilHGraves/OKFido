const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLBoolean, } = graphql;

const DogType = new GraphQLObjectType({
  name: "DogType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    id: { type: GraphQLID },
    age: { type: GraphQLString },
    gender: { type: GraphQLString },
    size: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    photoUrl: { type: GraphQLString },
  })
});

module.exports = DogType;