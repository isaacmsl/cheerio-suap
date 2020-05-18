const suapSettings = require('../utils/suapSettings');

const suapURL = suapSettings.SUAP_URL;
const matricula = suapSettings.MATRICULA;

const classTimeUrl = suapURL + `/edu/aluno/${matricula}/?tab=locais_aula_aluno`;

/* 
    it is necessary to order classes time by day 
    where response array contains 1,2,3,4 and 5 indexes itens that means, in order:
    monday, tuesday, wednesday, thursday and friday
*/
const qntDays = 5;

module.exports = {
    async index(_, response) {
        
        const rows = await getTableRows();

        if (rows) {
            const classesTime = [];
            
            
            let dayTimes = [];

            for (let day = 1; day <= qntDays; day++) {
                for (let row = 0; row < rows.length; row++) {
                    const timesData = rows.eq(row).children('td');

                    const time = {
                        time: timesData.eq(0).text(),
                        class: timesData.eq(day).children('span').attr('data-hint'),
                    }

                    dayTimes.push(time);
                }

                classesTime.push(dayTimes);
                dayTimes = [];
            }
            
            return response.send(classesTime);
        }

        return response.status(404).json({ error: 'Sorry, nothing was found.' });

    },
    async byDay(request, response) {

        let { dayIndex }  = request.params;

        // necessary to get corret index in table
        dayIndex = Number(dayIndex) + 1;
       
        const rows = await getTableRows();

        const validIndex = (dayIndex > 0) && (dayIndex <= qntDays);

        if (rows && validIndex) {

            let dayTimes = [];

            for (let row = 0; row < rows.length; row++) {
                const timesData = rows.eq(row).children('td');

                const time = {
                    time: timesData.eq(0).text(),
                    class: timesData.eq(dayIndex).children('span').attr('data-hint'),
                }

                dayTimes.push(time);
            }
            
            return response.send(dayTimes);
        }

        return response.status(404).json({
            error: 'Sorry, nothing was found. Please check day index param.',
            help: '0 = Monday, 1 = Tuesday, 2 = Wednesday, 3 = Thursday and 4 = Friday.',
        });

    }
}

async function getTableRows() {
    let $ = await suapSettings.getCheerioOf(classTimeUrl);
        
        const timeTables = await $('table tbody');

        // html structure is based in "Matutino" [1], "Vespertino" [2], "Noturno" [3]
        const qntTimeTables = 3;
    
        for (let i = 1; i <= qntTimeTables; i++) {

            const rows = timeTables.eq(i).children('tr');
            const tableHasContent = rows.eq(0).children('td').eq(1).text();

            if (tableHasContent) {
                return rows;
            }

        }

        return undefined;
}