const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLBoolean, GraphQLList } = graphql;

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
    // photos: { type: GraphQLList },
  })
});

module.exports = DogType;