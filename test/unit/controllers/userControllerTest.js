const sinon = require('sinon');

const { expect } = require('chai');
const HttpStatus = require('http-status-codes');

const userController = require('../../../api/controllers/userController');
const userService = require('../../../api/services/userService');

describe('userController', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should return an Internal Server Error when the service call fails', async() => {        
        const req = {};
        const res = {
            sentStatus: null,

            sendStatus: function sendStatus(status) {
                this.sentStatus = status;
            },
        };
        
        sinon.stub(userService, 'getUsersByCityAndDistanceWithin').throws();

        await userController.getUsersByCityAndDistance(req, res);

        expect(res.sentStatus).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    it('should return an Ok response with an array of users', async() => {        
        const req = {};
        const res = {
            sentBody: null,
            sentStatus: null,

            json: function json(body) {
                this.sentBody = body;
            },

            status: function sendStatus(status) {
                this.sentStatus = status;
                return this;
            },
        };

        const users = [
            {
                id: 322,
                first_name: "Hugo",
                last_name: "Lynd",
                email: "hlynd8x@merriam-webster.com",
                ip_address: "109.0.153.166",
                latitude: 51.6710832,
                longitude: 0.8078532,
            },
            {
                id: 396,
                first_name: "Terry",
                last_name: "Stowgill",
                email: "tstowgillaz@webeden.co.uk",
                ip_address: "143.190.50.240",
                latitude: -6.7098551,
                longitude: 111.3479498
            }
        ];
        
        sinon.stub(userService, 'getUsersByCityAndDistanceWithin').returns(users);

        await userController.getUsersByCityAndDistance(req, res);

        expect(res.sentStatus).to.equal(HttpStatus.OK);
        expect(res.sentBody).to.deep.equal(users);
    });
});
