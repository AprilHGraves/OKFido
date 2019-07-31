const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = graphql;

const DogEnvironmentDescriptionType = new GraphQLObjectType({
  name: "DogEnvironmentDescriptionType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    children: { type: GraphQLBoolean },    
    dogs: { type: GraphQLBoolean },
    cats: { type: GraphQLBoolean },
  })
});

module.exports = DogEnvironmentDescriptionType;