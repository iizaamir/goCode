const mongoose = require('mongoose');
//const User = require('./userModel');
const teamLeadSchema = new mongoose.Schema({
    name:{
        type:String
    },
    position:{
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
        select: '-_id -id -__v -member -adminRight -viewRight' //Only need user id
    });
    next();
});

const TeamLead = new mongoose.model('TeamLead',teamLeadSchema);
module.exports = TeamLead;
