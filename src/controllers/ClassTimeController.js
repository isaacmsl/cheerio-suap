const suapSettings = require('../utils/suapSettings');

const suapURL = suapSettings.SUAP_URL;
const matricula = suapSettings.MATRICULA;

const classTimeUrl = suapURL + `/edu/aluno/${matricula}/?tab=locais_aula_aluno`;

module.exports = {
    async index(_, response) {
        let $ = await suapSettings.getCheerioOf(classTimeUrl);
        
        const timeTables = await $('table tbody');

        // html structure is based in "Matutino" [1], "Vespertino" [2], "Noturno" [3]
        const qntTimeTables = 3;

        const classesTime = [];
        
        for (let i = 1; i <= qntTimeTables; i++) {

            const rows = timeTables.eq(i).children('tr');
            const tableHasContent = rows.eq(0).children('td').eq(1).text();

            if (tableHasContent) {

                for (let j = 0; j < rows.length; j++) {
                    const timesData = rows.eq(j).children('td');
                
                    const time = {
                        time: timesData.eq(0).text(),
                        monday: timesData.eq(1).children('span').attr('data-hint'),
                        tuesday: timesData.eq(2).children('span').attr('data-hint'),    
                        wednesday: timesData.eq(3).children('span').attr('data-hint'),  
                        thursday: timesData.eq(4).children('span').attr('data-hint'),   
                        friday: timesData.eq(5).children('span').attr('data-hint'), 
                    }

                    classesTime.push(time);
                }
                
            }

        }
        
        return response.send(classesTime);
    }
}