const express = require('express');

const ProfileController = require('./controllers/ProfileController');
const MessageController = require('./controllers/MessageController');
const NotificationController = require('./controllers/NotificationController');
const VirtualClassController = require('./controllers/VirtualClassController');

const routes = express.Router();

routes.get('/profile', ProfileController.index);

routes.get('/notifications', NotificationController.index);

routes.get('/messages', MessageController.index);

routes.get('/virtualClasses', VirtualClassController.index);

module.exports = routes;



