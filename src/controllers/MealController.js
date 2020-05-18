const suapSettings = require('../utils/suapSettings');

const suapURL = suapSettings.SUAP_URL;
// const matricula = suapSettings.MATRICULA;

const dataUrl = suapURL + `/ae/solicitar_refeicao/4/?tab=1`;

const qntGetMeals = 3;

module.exports = {
    async index(_, response) {
        let $ = await suapSettings.getCheerioOf(dataUrl);

        const table = await $('tbody');

        const rows = table.children('tr');

        const meals = [];

        const regex = new RegExp('\\ .* (.*?)\\\n', 'g');

        for (let row = 0; row < qntGetMeals; row++) {
            const meal =  {
                request_date: rows.eq(row).children('td').eq(0).text(),
                to_date: rows.eq(row).children('td').eq(1).text(),
                type: rows.eq(row).children('td').eq(2).text(),
                reason: rows.eq(row).children('td').eq(3).text(),
                situation: rows.eq(row).children('td').eq(4).text().split(regex)[0]
            }

            meals.push(meal);
        }
        
        return response.send(meals);
    }
}
