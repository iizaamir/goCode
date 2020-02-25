const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const TeamLead = require('./../models/teamLeadModel');

exports.getAllTeamLeads = catchAsync(async (req,res,next) => {
    const features = new APIFeatures(TeamLead.find(), req.query).filter();
    const teamLead = await features.query;
    //const teams = await features.query.populate('otherUsers'); //use populate for child referencing.
    res.status(200).json({
        status: 'success',
        results: teamLead.length,
        data:{
            teamLead: teamLead
        }
    });
});

exports.getTeamLead  = catchAsync(async (req,res,next) => { //send only the data that is chaning.
    const teamLead = await TeamLead.findById(req.params.id);
    // const team = await Team.findById(req.params.id).populate('otherUsers'); //use populate for child referencing.
    if(!teamLead){ //if error occured , pass it to next, when next receive something, it assumes error, jump to 
        //global error handling middleware
        return next(new AppError('No teamLead found with that id',404)); //jump to the error handling middleware,
        //return immediatly and not move to next line, below code
    };
    res.status(200).json({ //204 when we delete an object
        status : 'success',
        data : {
            teamLead : teamLead
        }
    });
});

exports.createTeamLead = catchAsync(async (req,res,next) => {
    const teamLead = await TeamLead.create(req.body);
    res.status(201).json({
        status: 'success',
        data:{
            teamLead: teamLead
        }
    });
});

exports.updateTeamLead= catchAsync(async (req,res,next) => { //send only the data that is chaning.
    const teamLead = await TeamLead.findByIdAndUpdate(req.params.id,req.body,{ //2nd is the data that we actually want 
        //to change is in post req
        new : true, //with this new updated document will be returned
        runValidators: true // again the data validators run each time
    }); 
    if(!teamLead){ //if error occured , pass it to next, when next receive something, it assumes error, jump to 
        //global error handling middleware
        return next(new AppError('No teamLead found with that id',404)); //jump to the error handling middleware,
        //return immediatly and not move to next line, below code
    };
    res.status(200).json({
        status : 'success',
        data : {
            teamLead: teamLead
        }
    });
});

exports.deleteTeamLead = catchAsync(async (req,res,next) => { //send only the data that is chaning.
    const teamLead = await TeamLead.findByIdAndDelete(req.params.id); //Don't save to vairable bcz don't want to send something to client
    if(!teamLead){ //if error occured , pass it to next, when next receive something, it assumes error, jump to 
        //global error handling middleware
        return next(new AppError('No teamLead found with that id',404)); //jump to the error handling middleware,
        //return immediatly and not move to next line, below code
    };
    res.status(204).json({ //204 when we delete an object
        status : 'success',
        data : null
    });
});