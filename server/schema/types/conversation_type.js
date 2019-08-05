const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID } = graphql;
const MessageType = require("./message_type");
const Conversation = mongoose.model("conversations");
const DogType = require("./dog_type");
const Petfinder = require("../../services/petfinder");

const ConversationType = new GraphQLObjectType({
  name: "ConversationType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    user: { type: GraphQLID },
    dogId: { type: GraphQLID },
    dog: {
      type: DogType,
      resolve(parentValue) {
        return Petfinder.getOneDog(parentValue.dogId);
      }
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parentValue) {
        return Conversation.findById(parentValue._id)
          .populate('messages')
          .then(conversation => conversation.messages);
      }
    }
  })
});

module.exports = ConversationType;