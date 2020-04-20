const suapSettings = require('../utils/suapSettings');

const suapURL = suapSettings.SUAP_URL;
const matricula = suapSettings.MATRICULA;

const academicDataUrl = suapURL + `/edu/aluno/${matricula}/?exibir_frequencia=1`;

module.exports = {
    async index(_, response) {
        let $ = await suapSettings.getCheerioOf(academicDataUrl);

        const tableIras = await $('#content > div > div > div > table > tbody').eq(0);

        const bruteIras = tableIras.children('tr');

        const iras = [];


        const regex = new RegExp('\\ .* (.*?)\\\n', 'g');

        for (let i = 0; i < bruteIras.length; i++) {
            const ira =  {
                period: bruteIras.eq(i).children('td').eq(0).text(),
                year: bruteIras.eq(i).children('td').eq(1).text(),
                situation: bruteIras.eq(i).children('td').eq(4).text().split(regex)[1],
                frequency: bruteIras.eq(i).children('td').eq(5).text(),
                value: bruteIras.eq(i).children('td').eq(6).text(),
            }

            iras.push(ira);
        }
        
        return response.send(iras);
    }
}