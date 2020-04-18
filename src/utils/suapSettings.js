const axios = require('axios');
const cheerio = require('cheerio');

// get all env variables at .env file (development)
require('dotenv').config();

const csrftoken = process.env.CSRF_TOKEN;
const sessionid = process.env.SESSION_ID;

const settings = {
    "method": "GET",
    "headers": {
        "cookie": `csrftoken=${csrftoken}; sessionid=${sessionid}`
    }
}

const MATRICULA = process.env.MATRICULA;
const SUAP_URL = 'https://suap.ifrn.edu.br';

module.exports = {
    MATRICULA,
    SUAP_URL,
    async getCheerioOf(url) {
        const page = await axios.get(url, settings);
        return cheerio.load(page.data);
    },
}