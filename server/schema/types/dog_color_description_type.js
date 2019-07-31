const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = graphql;

const DogColorDescriptionType = new GraphQLObjectType({
  name: "DogColorDescriptionType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    primary: { type: GraphQLString },
    secondary: { type: GraphQLString },
    tertiary: { type: GraphQLString },
  })
});

module.exports = DogColorDescriptionType;