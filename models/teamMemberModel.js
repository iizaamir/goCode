const mongoose = require('mongoose');
//const User = require('./userModel');
const teamMemberSchema = new mongoose.Schema({
    //this is parent referencing, Team model has address of it's two parents user. that are not in an array.
    name:{
        type:String
    },
    position:{
        type:String
    },
    existingMember:
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
        path: 'existingMember',
        select: '-_id -id -__v -lead -adminRight -viewRight' 
    });
    next();
});
const TeamMember = new mongoose.model('TeamMember',teamMemberSchema);
module.exports = TeamMember;
