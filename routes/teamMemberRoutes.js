const express= require('express');
const teamMemberController = require('./../controllers/teamMemberController');
const router = express.Router();//we create a new router,to connect this new router to application using middlewar.

router.route('/').get(teamMemberController.getAllTeamMembers).post(teamMemberController.createTeamMember);
router.route('/:id').get(teamMemberController.getTeamMember).patch(teamMemberController.updateTeamMember)
.delete(teamMemberController.deleteTeamMember);

module.exports = router;