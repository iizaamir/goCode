const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    position:{
        type:String
    },
},
{ //2nd is the object for schema options, when data is outputted as json so then true
    toJSON: {virtuals : true},
    toObject: {virtuals : true}
});

// Embedding Team inside User doc, this is a document middleware.
// userSchema.pre('save',async function(next){
//     const memberInPromises = this.memberIn.map(async id => await User.findById(id));
//     this.memberIn = await Promise.all(memberInPromises);
//     next();
// });

//Child referencing for both findById and find, this is a query middleware.
// userSchema.pre(/^find/, function(next){
//     this.populate({ //this points to current query.
//         path: 'memberIn',
//         select: 'teamName positionName'
//     });
//     next();
// });

const User = new mongoose.model('User',userSchema);
module.exports = User;