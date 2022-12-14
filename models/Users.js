const {Schema,model,Types} = require('mongoose');

const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email:{
            type:String,
            required:true,
            unique: true,
           
        },
        thoughts:[{
            type:Schema.Types.ObjectId,
            ref: "Thoughts"
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }]
    },
    {
        toJSON: {
          getters: true,
        },
      }
)

const Users = model('users',userSchema);
module.exports = Users;
