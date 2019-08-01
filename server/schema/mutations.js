const graphql = require("graphql");
const { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLInt, GraphQLID, GraphQLList } = graphql;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const UserType = require('./types/user_type');
const Like = mongoose.model("likes");
const LikeType = require('./types/like_type');
const AuthService = require("../services/auth");
const Petfinder = require("../services/petfinder");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        // all we need to log the user our is an id
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    likeDog: {
      type: LikeType,
      args: {
        userId: { type: GraphQLID },
        dogId: { type: GraphQLID }
      },
      resolve(_, args) {
        return Petfinder.getOneDog(args.dogId)
          .then(dog => (
            User.findById(args.userId)
              .then(user => {
                const like = new Like({user: args.userId, dogId: args.dogId });
                return like.save()
              })
          ))
      }
    },
    unlikeDog: {
      type: LikeType,
      args: {
        userId: { type: GraphQLID },
        dogId: { type: GraphQLID }
      },
      resolve(_, args) {
        return Like.find({ user: args.userId, dogId: args.dogId })
          .then(res => (
            res[0].delete()
          ))
      }
    },
    updateUser: {
      type: UserType,
      args: {
        _id: { type: GraphQLID },
        username: { type: GraphQLString },
        hasDogs: { type: GraphQLBoolean },
        hasCats: { type: GraphQLBoolean },
        hasChildren: { type: GraphQLBoolean },
        zipcode: { type: GraphQLInt },
        willTravel: { type: GraphQLInt },
        likedSizes: { type: new GraphQLList(GraphQLString)},
        likedGenders: { type: new GraphQLList(GraphQLString)},
        likedAges: { type: new GraphQLList(GraphQLString)}
      },
      resolve(_, { 
        _id,
        username,
        hasDogs,
        hasCats,
        hasChildren,
        zipcode,
        willTravel,
        likedSizes,
        likedGenders,
        likedAges
      }) {
        console.log('hellooooo');
        return User.findOneAndUpdate({ _id },
          {
            username,
            hasDogs,
            hasCats,
            hasChildren,
            zipcode,
            willTravel,
            likedSizes,
            likedGenders,
            likedAges
          },
          { new: true },
          (err, user) => {
            return user;
          });
      }
    }

  }
});

module.exports = mutation;