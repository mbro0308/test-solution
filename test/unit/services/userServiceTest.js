const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const sinon = require('sinon');

const bpdtsApp = require('../../../api/endpoints/bpdtsApp');
const userService = require('../../../api/services/userService');

chai.use(chaiAsPromised);

const expect = chai.expect;

describe('userService', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('#getUsersByCityAndDistanceWithin()', () => {
        it('should throw an error when the request to get users fails', async() => {
            const city = 'London';
            const distance = 50;
            const errorMessage = '#getUsers() failure';

            sinon.stub(bpdtsApp, 'getUsers').rejects(new Error(errorMessage));

            await expect(userService.getUsersByCityAndDistanceWithin(city, distance)).to.be.eventually.rejectedWith(errorMessage);
        });

        it('should throw an error when the request to get users by city fails', async() => {
            const city = 'London';
            const distance = 50;
            const errorMessage = '#getUsersByCity() failure';

            sinon.stub(bpdtsApp, 'getUsersByCity').rejects(new Error(errorMessage));

            await expect(userService.getUsersByCityAndDistanceWithin(city, distance)).to.be.eventually.rejectedWith(errorMessage);
        });

        it('should throw an error when an unsupported city is provided', async() => {
            const city = 'Newcastle';
            const distance = 50;
            const errorMessage = `Unsupported city: ${city}`;

            sinon.stub(bpdtsApp, 'getUsers').resolves();
            sinon.stub(bpdtsApp, 'getUsersByCity').resolves();

            await expect(userService.getUsersByCityAndDistanceWithin(city, distance)).to.be.eventually.rejectedWith(errorMessage);
        });

        it('should return an empty array when no users are found', async() => {
            const city = 'London';
            const distance = 50;

            sinon.stub(bpdtsApp, 'getUsers').resolves([]);
            sinon.stub(bpdtsApp, 'getUsersByCity').resolves([]);

            const result = await userService.getUsersByCityAndDistanceWithin(city, distance);

            expect(result).to.be.an('array').with.lengthOf(0);
        });

        it('should return an empty array when there are no users in the requested city and no users within the given distance', async() => {
            const city = 'London';
            const distance = 50;

            const getUsersResponse = [
                {
                    id: 1,
                    first_name: 'Maurise',
                    last_name: 'Shieldon',
                    email: 'mshieldon0@squidoo.com',
                    ip_address: '192.57.232.111',
                    latitude: 54.97328,
                    longitude: -1.61396,
                }
            ]

            sinon.stub(bpdtsApp, 'getUsers').resolves(getUsersResponse);
            sinon.stub(bpdtsApp, 'getUsersByCity').resolves([]);

            const result = await userService.getUsersByCityAndDistanceWithin(city, distance);

            expect(result).to.be.an('array').with.lengthOf(0);
        });

        it('should ensure that duplicate entries are not present in the response', async() => {
            const city = 'London';
            const distance = 50;

            const user = {
                id: 322,
                first_name: "Hugo",
                last_name: "Lynd",
                email: "hlynd8x@merriam-webster.com",
                ip_address: "109.0.153.166",
                latitude: 51.6710832,
                longitude: 0.8078532,
            };

            const getUsersResponse = [JSON.parse(JSON.stringify(user))];
            const getUsersByCityResponse = [JSON.parse(JSON.stringify(user))];

            sinon.stub(bpdtsApp, 'getUsers').resolves(getUsersResponse);
            sinon.stub(bpdtsApp, 'getUsersByCity').resolves(getUsersByCityResponse);

            const results = await userService.getUsersByCityAndDistanceWithin(city, distance);

            expect(results).to.be.an('array').with.lengthOf(1);
            expect(results[0]).to.deep.equal(user);
        });

        it('should return users listed with the given city and within the given distance', async() => {
            const city = 'London';
            const distance = 50;

            const userOne = {
                id: 135,
                first_name: "Mechelle",
                last_name: "Boam",
                email: "mboam3q@thetimes.co.uk",
                ip_address: "113.71.242.187",
                latitude: -6.5115909,
                longitude: 105.652983
            };

            const userTwo = {
                id: 322,
                first_name: "Hugo",
                last_name: "Lynd",
                email: "hlynd8x@merriam-webster.com",
                ip_address: "109.0.153.166",
                latitude: 51.6710832,
                longitude: 0.8078532,
            };

            const userThree = {
                id: 396,
                first_name: "Terry",
                last_name: "Stowgill",
                email: "tstowgillaz@webeden.co.uk",
                ip_address: "143.190.50.240",
                latitude: -6.7098551,
                longitude: 111.3479498
            };

            const getUsersResponse = [
                JSON.parse(JSON.stringify(userOne)),
                JSON.parse(JSON.stringify(userTwo)),
            ];
            const getUsersByCityResponse = [
                JSON.parse(JSON.stringify(userThree))
            ];

            sinon.stub(bpdtsApp, 'getUsers').resolves(getUsersResponse);
            sinon.stub(bpdtsApp, 'getUsersByCity').resolves(getUsersByCityResponse);

            const results = await userService.getUsersByCityAndDistanceWithin(city, distance);

            expect(results).to.be.an('array').with.lengthOf(2);
            expect(results[0]).to.deep.equal(userTwo);
            expect(results[1]).to.deep.equal(userThree);
        });
    });
});
