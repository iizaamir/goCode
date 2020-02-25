const mongoose = require('mongoose');
const rightSchema = new mongoose.Schema({
    // adminRight:{
    //     type:String
    // },
    // viewRight:{
    //     type:String
    // },
    // timeStamp:{
    //     type:String
    // },

    //this is parent referencing, right model has address of it's two parents user and team. that are not in an array.
    teamMemberName:{
        type: mongoose.Schema.ObjectId,
        ref:  'Team'
        // required: [true,'Profile mush belong to a user']
    },
    positionName:{
        type: mongoose.Schema.ObjectId,
        ref: 'Team'
        // required: [true,'Teaming must belong to a team']
    },
    rights:{
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
        path: 'teamMemberName',
        select: 'teamMemberName' //Only need user id
    }).populate({
        path: 'positionName',
        select: 'positionName' //Only need team id , if need to display 2 fields then 'member teamLead'
    }).populate({
        path: 'rights',
        select: 'rights'
    });
    next();
});

const Right = new mongoose.model('Right',rightSchema);
module.exports = Right;