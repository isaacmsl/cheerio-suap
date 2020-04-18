const suapSettings = require('../utils/suapSettings');

const suapURL = suapSettings.SUAP_URL;
// const matricula = suapSettings.MATRICULA;

const virtualClassUrl = suapURL + '/edu/salas_virtuais/';

module.exports = {
    async index(_, response) {
        let $ = await suapSettings.getCheerioOf(virtualClassUrl);

        const bruteVirtualClasses = await $('#content > div.box > div > div.flex-container.boxes.services > div');

        const virtualClasses = [];
        for (let i = 0; i < bruteVirtualClasses.length; i++) {
            const virtualClass = {
                id: bruteVirtualClasses.children('h4').eq(i).text(),
                name: bruteVirtualClasses.children('h5').eq(i).text(),
            };
            virtualClasses.push(virtualClass);
        }

        return response.send(virtualClasses);
    }
}