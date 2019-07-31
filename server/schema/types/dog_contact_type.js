const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;
const DogContactAddressType = require('./dog_contact_address_type')

const DogContactType = new GraphQLObjectType({
  name: "DogContactType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: DogContactAddressType },
  })
});

module.exports = DogContactType;