const suapSettings = require('../utils/suapSettings');

const suapURL = suapSettings.SUAP_URL;
const matricula = suapSettings.MATRICULA;

const academicDataUrl = suapURL + `/edu/aluno/${matricula}/?tab=boletim`;

module.exports = {
    async index(_, response) {
        let $ = await suapSettings.getCheerioOf(academicDataUrl);

        const tableReports = await $('.borda tbody').eq(0);

        const bruteReports = tableReports.children('tr');

        const reports = [];

        const regex = new RegExp('\\.*- (.*) ', 'g');

        for (let i = 0; i < bruteReports.length; i++) {

            const report =  {
                subject: bruteReports.eq(i).children('td').eq(1).text().split(regex)[1],
                total_classes: bruteReports.eq(i).children('td').eq(3).text(),
                total_lack: bruteReports.eq(i).children('td').eq(4).text(),
                frequency: bruteReports.eq(i).children('td').eq(5).text(),
                situation: bruteReports.eq(i).children('td').eq(6).text(),
                grades: {},
            }

            const colspanTD7 = bruteReports.eq(i).children('td').eq(7).attr('colspan');
            const colspanTD11 = bruteReports.eq(i).children('td').eq(11).attr('colspan');
            if (colspanTD7 === '4') {
                report.grades.n3 = bruteReports.eq(i).children('td').eq(8).text();
                report.grades.n4 = bruteReports.eq(i).children('td').eq(10).text();
            } else {
                report.grades.n1 = bruteReports.eq(i).children('td').eq(7).text();
                report.grades.n2 = bruteReports.eq(i).children('td').eq(9).text();
                if (colspanTD11 !== '4') {
                    report.grades.n3 = bruteReports.eq(i).children('td').eq(11).text();
                    report.grades.n4 = bruteReports.eq(i).children('td').eq(13).text();
                }
            }

            reports.push(report);
        }
        
        return response.send(reports);
    }
}