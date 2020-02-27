const mongoose = require('mongoose');
//const User = require('./userModel');
const teamMemberSchema = new mongoose.Schema({
    //this is parent referencing, Team model has address of it's two parents user. that are not in an array.
    teamMember:
        {
        type: mongoose.Schema.ObjectId,
        ref:  'Team'
        // required: [true,'member must be a user']
    }
},
{
    toJSON: {virtuals : true},
    toObject: {virtuals : true}
});

teamMemberSchema.pre(/^find/, function(next){
    this.populate({
        path: 'teamMember',
        select: 'members' 
    });
    next();
});
//Populate profile and team when make a request to rightSchems/Model.
// teamLeadSchema.pre(/^find/, function(next){
//     this.populate({
//         path: 'teamMember', 
//         select: 'teamMemberName ' //Only need user id
//     }).populate({
//         path: 'position',
//         select: 'positionName' //Only need user id , if need to display 2 fields then 'member teamLead'
//     });
//     next();
// });

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
const TeamMember = new mongoose.model('TeamMember',teamMemberSchema);
module.exports = TeamMember;
