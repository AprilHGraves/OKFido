const graphql = require("graphql"); 
const {GraphQLObjectType, GraphQLString, GraphQLBoolean } = graphql;

const DogBreedDescriptionType = new GraphQLObjectType({
  name: "DogBreedDescriptionType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    primary: { type: GraphQLString },
    secondary: { type: GraphQLString },
    mixed: { type: GraphQLBoolean },
    unknown: { type: GraphQLBoolean },
  })
});

module.exports = DogBreedDescriptionType;