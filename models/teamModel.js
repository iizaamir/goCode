const mongoose = require('mongoose');
//const User = require('./userModel');
const teamSchema = new mongoose.Schema({
    teamName:{
        type:String
    },
    members:[
        {
            memberName:{
                type:String
            },
            positionName:{
                type:String
            },
            memberRight:{
                type:String
            }
        }
    ],
    teamLead:[
        {
            leadName:{
                type:String
            },
            leadPosition:{
                type:String
            },
            leadRight:{
                type:String
            }
        }
    ]

    //this is parent referencing, Team model has address of it's two parents user. that are not in an array.
    // member:{
    //     type: mongoose.Schema.ObjectId,
    //     ref:  'User',
    //     required: [true,'member must be a user']
    // },
    // teamLead:{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     required: [true,'teamLead must be a user']
    // }

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
// teamSchema.pre(/^find/, function(next){
//     this.populate({
//         path: 'member',
//         select: '_id' //Only need user id
//     }).populate({
//         path: 'teamLead',
//         select: '_id' //Only need user id , if need to display 2 fields then 'member teamLead'
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


const Team = new mongoose.model('Team',teamSchema);
module.exports = Team;
