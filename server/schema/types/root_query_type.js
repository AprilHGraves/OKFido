const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;

const UserType = require("./user_type");
const DogType = require("./dog_type");
const LikeType = require("./like_type");
const ConversationType = require("./conversation_type");
const MessageType = require("./message_type");
const Petfinder = require("../../services/petfinder");
const AuthService = require("../../services/auth");

const User = mongoose.model("users");
const Like = mongoose.model("likes");
const Conversation = mongoose.model("conversations");
const Message = mongoose.model("messages");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    messagesByConversation: {
      type: new GraphQLList(MessageType),
      args: {
        convoId: { type: GraphQLID }
      },
      resolve(_, args) {
        return Message.find({conversation: args.convoId})
      }
    },
    specificConversations: {
      type: new GraphQLList(ConversationType),
      args: {
        convoIds: { type: new GraphQLList(GraphQLID) }
      },
      resolve(_, args) {
        return Conversation.find({
          _id: {
            $in: args.convoIds
          }
        })
      }
    },
    conversationByUserAndDog: {
      type: ConversationType,
      args: {
        user: { type: GraphQLID },
        dogId: { type: GraphQLID }
      },
      resolve(_, args) {
        return Conversation.findOne(args)
          .then(data => {
            if (data) {
              return data
            } else {
              const convo = new Conversation(args);
              return convo.save()
            }
          })
      }
    },
    conversationsByUser: {
      type: new GraphQLList(ConversationType),
      args: {
        userId: { type: GraphQLID }
      },
      resolve(_, args) {
        return Conversation.find({ user: args.userId })
      }
    },
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
      args: { distance: { type: GraphQLString }, location: { type: GraphQLString} },
      resolve(_, args) {
        return Petfinder.searchByDistAndLoc(args.distance, args.location);
      }
    },
    searchDogs: {
      type: new GraphQLList(DogType),
      args: { searchArgs: { type: GraphQLString } },
      resolve(_, args) {
        return Petfinder.dogSearch(args.searchArgs);
      }
    },
  })
});

module.exports = RootQueryType;