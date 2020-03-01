const mongoose = require('mongoose');
//const User = require('./userModel');
const teamSchema = new mongoose.Schema({
    teamName:{
        type:String
    },
    member:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    lead:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    adminRight :[
        {   
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    viewRight:[
        {   
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {virtuals : true},
    toObject: {virtuals : true}
});

//Populate profile and team when make a request to rightSchems/Model.
teamSchema.pre(/^find/, function(next){
    this.populate({
        path: 'member',
        select: 'name position' //Only need user id
    }).populate({
        path: 'lead',
        select: 'name position' //Only need user id , if need to display 2 fields then 'member teamLead'
    }).populate({
        path: 'adminRight',
        select: 'name position'
    }).populate({
        path: 'viewRight',
        select: 'name position'
    });
    next();
});

const Team = new mongoose.model('Team',teamSchema);
module.exports = Team;
