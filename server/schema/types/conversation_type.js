const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID } = graphql;
const MessageType = require("./message_type");

const ConversationType = new GraphQLObjectType({
  name: "ConversationType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    user: { type: GraphQLID },
    dogId: { type: GraphQLID },
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