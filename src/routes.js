const express = require('express');

const ProfileController = require('./controllers/ProfileController');
const MessageController = require('./controllers/MessageController');
const NotificationController = require('./controllers/NotificationController');
const VirtualClassController = require('./controllers/VirtualClassController');
const IRAController = require('./controllers/IRAController');
const RequirementController = require('./controllers/RequirementController');
const ReportController = require('./controllers/ReportController');

const routes = express.Router();

routes.get('/profile', ProfileController.index);

routes.get('/notifications', NotificationController.index);

routes.get('/messages', MessageController.index);

routes.get('/virtualClasses', VirtualClassController.index);

routes.get('/iras', IRAController.index);

routes.get('/requirements', RequirementController.index);

routes.get('/reports', ReportController.index);

module.exports = routes;



