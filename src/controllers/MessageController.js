const suapSettings = require('../utils/suapSettings');

const suapURL = suapSettings.SUAP_URL;
// const matricula = suapSettings.MATRICULA;

const messagesURL = suapURL + '/admin/edu/mensagementrada/?tab=tab_nao_lidas';

module.exports = {
    async index(_, response) {
        let $ = await suapSettings.getCheerioOf(messagesURL);

        const bruteMessages = await $('#result_list > tbody > tr');

        const messages = [];
        for (let i = 0; i < bruteMessages.length; i++) {
            const message = {
                from: bruteMessages.children('.field-remetente').eq(i).text(),
                title: bruteMessages.children('.field-assunto').eq(i).text(),
                date: bruteMessages.children('.field-data_envio').eq(i).text(),
            };
            messages.push(message);
        }

        return response.send(messages);
    }
}