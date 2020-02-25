const mongoose = require('mongoose');
//const User = require('./userModel');
const teamLeadSchema = new mongoose.Schema({

    // teamMemberName:{
    //     type:String
    // },
    // positionName:{
    //     type:String
    // },
    // adminRight:[Number],
    // viewRight:[Number],
    // timeStamp:{
    //     type:String
    // },
    //This is for embadding.
    // otherUsers:[Array],
    teamLeadType:{
        type:String
    },
    //this is parent referencing, Team model has address of it's two parents user. that are not in an array.
    teamMember:
        {
        type: mongoose.Schema.ObjectId,
        ref:  'Team'
        // required: [true,'member must be a user']
    },
    position:{
        type: mongoose.Schema.ObjectId,
        ref: 'Team'
        // required: [true,'teamLead must be a user']
    }
    //This one is for referencing/ child referencing.
    // otherUsers:[
    //     {
    //         type: mongoose.Schema.ObjectId,
    //         ref: 'User'
    //     }
    // ]
},
{
    toJSON: {virtuals : true},
    toObject: {virtuals : true}
});

//Populate profile and team when make a request to rightSchems/Model.
teamLeadSchema.pre(/^find/, function(next){
    this.populate({
        path: 'teamMember', 
        select: 'teamMemberName ' //Only need user id
    }).populate({
        path: 'position',
        select: 'positionName' //Only need user id , if need to display 2 fields then 'member teamLead'
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
