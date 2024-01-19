const axios = require('axios');

const instance = axios.create({
    baseURL: process.env.SHORTENER_API,
});

module.exports = instance;
