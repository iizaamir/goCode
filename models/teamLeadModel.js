const mongoose = require('mongoose');
//const User = require('./userModel');
const teamLeadSchema = new mongoose.Schema({
    leadName:{
        type:String
    },
    leadPosition:{
        type:String
    },
    leadRight:{
        type:String
    },
    existingLead:{
        type: mongoose.Schema.ObjectId,
        ref: 'Team'
        // required: [true,'teamLead must be a user']
    }
},
{
    toJSON: {virtuals : true},
    toObject: {virtuals : true}
});

//Populate profile and team when make a request to rightSchems/Model.
teamLeadSchema.pre(/^find/, function(next){
    this.populate({
        path: 'existingLead', 
        select: '-_id -id -__v -members' //Only need user id
    });
    next();
});

// Embedding team document with user doc, this is a document middleware.
// teamSchema.pre('save',async function(next){
//     const otherUsersPromises = this.otherUsers.map(async id => await User.findById(id));
//     this.otherUsers= await Promise.all(otherUsersPromises);
//     next();
// });

//Child referencing for both findById and find, this is a query middleware.
// teamSchema.pre(/^find/, function(next){
//     this.populate({ //this points t current query.
//         path: 'otherUsers',
//         select: '-__v, -password'
//     });
//     next();
// });

const TeamLead = new mongoose.model('TeamLead',teamLeadSchema);
module.exports = TeamLead;
