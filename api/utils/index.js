const constants = require('../constants');

/**
 * Find the latitude and longitude of the given city.
 * @param {string} city The city to find coordiantes.
 * @returns {Object} coordinates
 * @returns {number} coordinates.latitude The latitude of the city
 * @returns {number} coordinates.longitude The longitude of the city
 * @throws Will throw an error if there are no coordiantes defined for the city.
 */
function getCityCoordinates(city) {
    switch (city) {
        case 'London':
            return { 
                latitude: constants.LONDON_LATITUDE,
                longitude: constants.LONDON_LONGITUDE,
            };

        default:
            throw new Error(`Unsupported city: ${city}`);
    }
}

/**
 * Calculate the distance in miles between two coordinates using the haversine formula.
 * @param {Object} coordinatesOne 
 * @param {Object} coordinatesTwo 
 * @return {number} The distance in miles between the two coordinates.
 */
function getDistanceBetweenInMiles(coordinatesOne, coordinatesTwo) {
    const toRadians = (value) => value * (Math.PI / 180);

    const dLatitude = toRadians(coordinatesTwo.latitude - coordinatesOne.latitude);
    const dLongitude = toRadians(coordinatesTwo.longitude - coordinatesOne.longitude);

    const a = 
        Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
        Math.cos(toRadians(coordinatesOne.latitude)) * Math.cos(toRadians(coordinatesTwo.latitude)) *
        Math.sin(dLongitude / 2) * Math.sin(dLongitude / 2);

    const c = 2 * Math.asin(Math.sqrt(a));

    return c * constants.EARTH_RADIUS_MILES;
}

module.exports = {
    getCityCoordinates,
    getDistanceBetweenInMiles,
}
