const express= require('express');
const teamLeadController = require('./../controllers/teamLeadController');
const router = express.Router();//we create a new router,to connect this new router to application using middlewar.

router.route('/').get(teamLeadController.getAllTeamLeads).post(teamLeadController.createTeamLead);
router.route('/:id').get(teamLeadController.getTeamLead).patch(teamLeadController.updateTeamLead)
.delete(teamLeadController.deleteTeamLead);

module.exports = router;