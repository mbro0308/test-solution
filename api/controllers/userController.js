const HttpStatus = require('http-status-codes');

const userService = require('../services/userService');

/**
 * Get a list of users listed as living in London or within 50 miles of London.
 * @param {Object} req Express request object.
 * @param {Object} res Express response object.
 * @returns {Array} A list of users.
 */
async function getUsersByCityAndDistance(req, res) {
    try {
        const city = 'London';
        const distance = 50;

        const users = await userService.getUsersByCityAndDistanceWithin(city, distance);

        return res.status(HttpStatus.OK).json(users);
    } catch (err) {
        return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getUsersByCityAndDistance,
}
