const bpdtsApp = require('../endpoints/bpdtsApp');

const {
    getCityCoordinates,
    getDistanceBetweenInMiles
} = require('../utils');

/**
 * Find users listed as living in the given city or within the given distance of the city.
 * @param {string} city The city to find users listed in or within the given distance.
 * @param {number} distance The distance in miles the user must be located within the given city.
 * @returns {Array} A list of users.
 */
async function getUsersByCityAndDistanceWithin(city, distance) {
    const [users, usersByCity] = await Promise.all([
        bpdtsApp.getUsers(),
        bpdtsApp.getUsersByCity(city),    
    ]);

    const cityCoordinates = getCityCoordinates(city);

    const usersWithinDistanceOfCity = users.filter((user) => {
        const userCoordinates = { latitude: user.latitude, longitude: user.longitude };

        return getDistanceBetweenInMiles(cityCoordinates, userCoordinates) <= distance;
    });

    const matchingUsers = usersByCity.concat(usersWithinDistanceOfCity);

    if (matchingUsers.length) {
        // Concatenate results, filter out duplicates and sort by id ascending.
        return matchingUsers
            .filter((user, index, array) => array.findIndex((element) => user.id === element.id) === index)
            .sort((userOne, userTwo) => userOne.id - userTwo.id);
    }

    return [];
}

module.exports = {
    getUsersByCityAndDistanceWithin,
}
