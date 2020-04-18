const suapSettings = require('../utils/suapSettings');

const suapURL = suapSettings.SUAP_URL;
const matricula = suapSettings.MATRICULA;

const academicDataUrl = suapURL + `/edu/aluno/${matricula}/?tab=dados_academicos`;

module.exports = {
    async index(_, response) {
        let $ = await suapSettings.getCheerioOf(academicDataUrl);

        const full_name = await $('#content > div.box > div > div > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)').text();
        const photo_profile_url = suapURL + await $('#content > div.box > div > div > div.photo-circle.big > img').attr('src');
        const period = await $('#content > div.box > div > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2)').text();
        const ira = await $('#content > div.box > div > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(4)').text();
        const situation = await $('#content > div.box > div > div > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(4) > span').text();
        const fingerprint = await $('#content > div.box > div > div > div:nth-child(2) > table > tbody > tr:nth-child(8) > td:nth-child(2)').text();

        const profile = {
            full_name,
            matricula,
            situation,
            period,
            ira,
            photo_profile_url,
            fingerprint,
        }
        
        return response.send(profile);
    }
}