const {Schema,Types} = require('mongoose');

//create Reaction Schema

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)


//create Thought Schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username:{
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
    toJSON: {
        virtuals: true,
      },
      id: false,
}
)

const Thoughts = model('thoughts',thoughtSchema);

module.exports = Thoughts;
