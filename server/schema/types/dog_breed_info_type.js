const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = graphql;

const DogBreedInfoType = new GraphQLObjectType({
  name: "DogBreedInfoType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    bred_for: { type: GraphQLString },
    temperament: { type: GraphQLString },
    life_span: { type: GraphQLString },
  })
});

module.exports = DogBreedInfoType;