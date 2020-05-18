const express = require('express');

// get all controllers
const ctrls = require('require-all')({
    dirname : __dirname + '/controllers',
    filter  : /^(.+Controller)\.js$/
});

const routes = express.Router();

routes.get('/profile', ctrls.ProfileController.index);

routes.get('/notifications', ctrls.NotificationController.index);

routes.get('/messages', ctrls.MessageController.index);

routes.get('/virtualClasses', ctrls.VirtualClassController.index);

routes.get('/iras', ctrls.IRAController.index);

routes.get('/requirements', ctrls.RequirementController.index);

routes.get('/reports', ctrls.ReportController.index);

routes.get('/classesTime', ctrls.ClassTimeController.index);
routes.get('/classesTime/:dayIndex', ctrls.ClassTimeController.byDay);

routes.get('/meals', ctrls.MealController.index);

module.exports = routes;



