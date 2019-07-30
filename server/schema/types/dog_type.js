const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLBoolean, } = graphql;

const DogBreedDescriptionType = require('./dog_breed_description_type');
const DogColorDescriptionType = require('./dog_color_description_type');
const DogEnvironmentDescriptionType = require('./dog_environment_description_type');

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
    breeds: { type: DogBreedDescriptionType },
    colors: { type: DogColorDescriptionType },
    coat: { type: GraphQLString },
    environment: { type: DogEnvironmentDescriptionType },
  })
});

module.exports = DogType;