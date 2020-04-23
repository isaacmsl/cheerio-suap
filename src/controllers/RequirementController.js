const suapSettings = require('../utils/suapSettings');

const suapURL = suapSettings.SUAP_URL;
const matricula = suapSettings.MATRICULA;

const requirementsUrl = suapURL + `/edu/aluno/${matricula}/?tab=requisitos`;

module.exports = {
    async index(_, response) {
        let $ = await suapSettings.getCheerioOf(requirementsUrl);

        const progress = await $('.progress').text();
        const tableRequirements = await $('.tab-container[data-tab="requisitos"] tbody');

        const bruteData = tableRequirements.children('tr');

        const requirements = [];

        const regex = new RegExp('\\ .* (.*?)\\\n', 'g');

        for (let i = 0; i < bruteData.length; i++) {
            const requirement =  {
                request: bruteData.eq(i).children('td').eq(0).text(),
                situation: bruteData.eq(i).children('td').eq(1).text(),
                ch_expected: bruteData.eq(i).children('td').eq(2).text(),
                ch_done: bruteData.eq(i).children('td').eq(3).text().split(regex)[1],
                ch_pending: bruteData.eq(i).children('td').eq(4).text().split(regex)[1],
            }

            requirements.push(requirement);
        }
        
        const result = {
            progress,
            requirements
        }
        return response.send(result);
    }
}