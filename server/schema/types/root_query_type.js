const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;

const UserType = require("./user_type");
const DogType = require("./dog_type");
const LikeType = require("./like_type");
const Petfinder = require("../../services/petfinder");
const AuthService = require("../../services/auth");

const User = mongoose.model("users");
const Like = mongoose.model("likes");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    userByToken: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    likedDogs: {
      type: LikeType,
      args: {
        userId: { type: GraphQLID }
      },
      resolve(_, args) {
        return Like.find({ user: args.userId })
          .then(likes => {
            const dogIds = likes.map(like => like.dogId );
            return { dogIds: dogIds }
          })
      }
    },
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
    dog: {
      type: DogType,
      args: { dogId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Petfinder.getOneDog(args.dogId)
      }
    },
    dogs: {
      type: new GraphQLList(DogType),
      resolve(_, args) {
        return Petfinder.getShibas();
      }
    }
  })
});

module.exports = RootQueryType;