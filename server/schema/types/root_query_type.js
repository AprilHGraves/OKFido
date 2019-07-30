const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const DogType = require("./dog_type");
const Petfinder = require("../../services/petfinder");

const User = mongoose.model("users");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    dogs: {
      type: new GraphQLList(DogType),
      // args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Petfinder.getShibas();
      }
    }
  })
});

module.exports = RootQueryType;