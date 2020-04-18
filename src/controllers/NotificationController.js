const suapSettings = require('../utils/suapSettings');

const suapURL = suapSettings.SUAP_URL;
// const matricula = suapSettings.MATRICULA;

const notificationsURL = suapURL + '/comum/notificacoes/';

module.exports = {
    async index(_, response) {
        let $ = await suapSettings.getCheerioOf(notificationsURL);

        const bruteNotifications = await $('#content > div.list-articles > ul > li > a');
        
        const notifications = [];
        for (let i = 0; i < bruteNotifications.length; i++) {
            const notification = {
                date: bruteNotifications.children('p').eq(i).text(),
                text: bruteNotifications.children('h3').eq(i).text(),
            };
            notifications.push(notification);
        }

        return response.send(notifications);
    }
}