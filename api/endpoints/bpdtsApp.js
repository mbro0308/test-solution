const https = require('https');

const axios = require('axios');
const config = require('config');

const service = axios.create({
    baseURL: config.get('services.bpdtsApp.baseURL'),
    httpsAgent: new https.Agent({ keepAlive: true }),
    timeout: 1000,
});

/**
 * @returns {Array} A list of users.
 */
async function getUsers() {
    const response = await service.get('/users', {
        headers: {
            'Accept': 'application/json'
        },
    });

    return response.data;
}

/**
 * Get a list of users listed as living in the given city.
 * @param {string} city The city to find users listed as living in.
 * @returns {Array} A list of users.
 */
async function getUsersByCity(city) {
    if (!city) {
        throw new Error('A city must be provided.');
    }

    const response = await service.get(`/city/${city}/users`, {
        headers: {
            'Accept': 'application/json',
        },
    });

    return response.data;
}

module.exports = {
    getUsers,
    getUsersByCity,
}
