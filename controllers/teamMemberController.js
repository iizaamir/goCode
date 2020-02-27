const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const TeamMember = require('./../models/teamMemberModel');

exports.getAllTeamMembers = catchAsync(async (req,res,next) => {
    const features = new APIFeatures(TeamMember.find(), req.query).filter();
    const teamMember = await features.query;
    //const teams = await features.query.populate('otherUsers'); //use populate for child referencing.
    res.status(200).json({
        status: 'success',
        results: teamMember.length,
        data:{
            teamMember: teamMember
        }
    });
});

exports.getTeamMember  = catchAsync(async (req,res,next) => { //send only the data that is chaning.
    const teamMember = await TeamMember.findById(req.params.id);
    // const team = await Team.findById(req.params.id).populate('otherUsers'); //use populate for child referencing.
    if(!teamMember){ //if error occured , pass it to next, when next receive something, it assumes error, jump to 
        //global error handling middleware
        return next(new AppError('No user found with that id',404)); //jump to the error handling middleware,
        //return immediatly and not move to next line, below code
    };
    res.status(200).json({ //204 when we delete an object
        status : 'success',
        data : {
            teamMember : teamMember
        }
    });
});

exports.createTeamMember = catchAsync(async (req,res,next) => {
    const teamMember = await TeamMember.create(req.body);
    res.status(201).json({
        status: 'success',
        data:{
            teamMember: teamMember
        }
    });
});

exports.updateTeamMember= catchAsync(async (req,res,next) => { //send only the data that is chaning.
    const teamMember = await TeamMember.findByIdAndUpdate(req.params.id,req.body,{ //2nd is the data that we actually want 
        //to change is in post req
        new : true, //with this new updated document will be returned
        runValidators: true // again the data validators run each time
    }); 
    if(!teamMember){ //if error occured , pass it to next, when next receive something, it assumes error, jump to 
        //global error handling middleware
        return next(new AppError('No teamMember found with that id',404)); //jump to the error handling middleware,
        //return immediatly and not move to next line, below code
    };
    res.status(200).json({
        status : 'success',
        data : {
            teamMember: teamMember
        }
    });
});

exports.deleteTeamMember = catchAsync(async (req,res,next) => { //send only the data that is chaning.
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id); //Don't save to vairable bcz don't want to send something to client
    if(!teamMember){ //if error occured , pass it to next, when next receive something, it assumes error, jump to 
        //global error handling middleware
        return next(new AppError('No teamMember found with that id',404)); //jump to the error handling middleware,
        //return immediatly and not move to next line, below code
    };
    res.status(204).json({ //204 when we delete an object
        status : 'success',
        data : null
    });
});