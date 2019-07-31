const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const DogContactAddressType = new GraphQLObjectType({
  name: "DogContactAddressType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    address1: { type: GraphQLString },
    address2: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    postcode: { type: GraphQLString },
    country: { type: GraphQLString },
  })
});

module.exports = DogContactAddressType;