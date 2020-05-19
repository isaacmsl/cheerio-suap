const suapSettings = require('../utils/suapSettings');

const suapURL = suapSettings.SUAP_URL;
const matricula = suapSettings.MATRICULA;

const dataUrl = suapURL + `/edu/aluno/${matricula}/?tab=locais_aula_aluno`;

const regex = new RegExp('\\ .* (.*?)\\\n', 'g');
const regexName = new RegExp('\n* - (.*) -');
const rmWhiteSpaces = /\n^\s+|\s+$/gm;

module.exports = {
    async index(_, response) {
        let $ = await suapSettings.getCheerioOf(dataUrl);

        const table = await $('table tbody').eq(4);

        const rows = table.children('tr');


        const virtualClasses = [];
        for (let row = 0; row < rows.length; row++) {
            const virtualClass = {
                virtual_id: rows.eq(row).children('td').eq(0).text().split(regex)[3],
                name: rows.eq(row).children('td').eq(1).text().split(regexName)[1],
                professor: rows.eq(row).children('td').eq(1).text().replace(rmWhiteSpaces,'').split(':')[2],
            };
            virtualClasses.push(virtualClass);
        }

        return response.send(virtualClasses);
    }
}