const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList } = graphql;
const mongoose = require("mongoose");
const UserType = require('./types/user_type');
const AuthService = require("../services/auth");

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
        likedSizes: { type: GraphQLList},
        likedGenders: { type: GraphQLList},
        likedAges: { type: GraphQLList}
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