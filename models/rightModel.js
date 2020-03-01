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
    existingAdminRight:{
        type: mongoose.Schema.ObjectId,
        ref: 'Team'
    },
    existingViewRight:{
        type: mongoose.Schema.ObjectId,
        ref: 'Team'
    }
},
{ //2nd is the object for schema options, when data is outputted as json so then true
    toJSON: {virtuals : true},
    toObject: {virtuals : true}
});

//Populate profile and team when make a request to rightSchems/Model.
rightSchema.pre(/^find/, function(next){
    this.populate({
        path: 'existingAdminRight',
        select: '-_id -id -__v -member -lead -viewRight' //Only need user id
    }).populate({
        path: 'existingViewRight',
        select: '-_id -id -__v -member -lead -adminRight' //Only need user id
    });
    next();
});

const Right = new mongoose.model('Right',rightSchema);
module.exports = Right;