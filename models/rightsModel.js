const mongoose = require('mongoose');
const rightSchema = new mongoose.Schema({
    name:{
        type:String
    },
    position:{
        type:String
    },
    right:{
        type:String
    },
    existingMemberRights:{
        type: mongoose.Schema.ObjectId,
        ref:  'Team'
        // required: [true,'Profile mush belong to a user']
    },
    existinLeadRights:{
        type: mongoose.Schema.ObjectId,
        ref: 'Team'
        // required: [true,'Teaming must belong to a team']
    }
},
{ //2nd is the object for schema options, when data is outputted as json so then true
    toJSON: {virtuals : true},
    toObject: {virtuals : true}
});

//Populate profile and team when make a request to rightSchems/Model.
rightSchema.pre(/^find/, function(next){
    this.populate({
        path: 'existingMemberRights',
        select: 'members' //Only need user id
    }).populate({
        path: 'existinLeadRights',
        select: 'teamLead' //Only need team id , if need to display 2 fields then 'member teamLead'
    });
    next();
});

const Right = new mongoose.model('Right',rightSchema);
module.exports = Right;