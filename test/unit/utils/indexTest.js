const { expect } = require('chai');

const constants = require('../../../api/constants');
const utils = require('../../../api/utils');

describe('Utils', () => {
    describe('#getCityCoordinates()', () => {
        it('should return the longitude and latitude values when London is provided', () => {
            const city = 'London';
            
            const coordinates = utils.getCityCoordinates(city);

            expect(coordinates.latitude).to.equal(constants.LONDON_LATITUDE);
            expect(coordinates.longitude).to.equal(constants.LONDON_LONGITUDE);
        });

        it('should throw an error when an unsupported city is provided', () => {
            const city = 'Newcastle';

            const getCityCoordinates = () => utils.getCityCoordinates(city);

            expect(getCityCoordinates).to.throw(Error, `Unsupported city: ${city}`);
        });
    });

    describe('#getDistanceBetweenInMiles()', () => {
        it('should return zero when the two coordinates are equal', () => {
            const coordinatesOne = {
                latitude: constants.LONDON_LATITUDE,
                longitude: constants.LONDON_LONGITUDE,
            };

            const coordinatesTwo = {
                latitude: constants.LONDON_LATITUDE,
                longitude: constants.LONDON_LONGITUDE,
            };

            const distanceInMiles = 0;

            expect(utils.getDistanceBetweenInMiles(coordinatesOne, coordinatesTwo)).to.equal(distanceInMiles);
        });

        it('should calculate the distance in miles between the two coordinates', () => {
            const coordinatesOne = {
                latitude: constants.LONDON_LATITUDE,
                longitude: constants.LONDON_LONGITUDE,
            };

            const coordinatesTwo = {
                latitude: 54.97328,
                longitude: -1.61396,
            };

            const distanceInMiles = 247.4234946806648;

            expect(utils.getDistanceBetweenInMiles(coordinatesOne, coordinatesTwo)).to.equal(distanceInMiles);
        });
    });
});
