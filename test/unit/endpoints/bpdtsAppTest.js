// Third party dependencies
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const config = require('config');
const HttpStatus = require('http-status-codes');
const nock = require('nock');

const bpdtsApp = require('../../../api/endpoints/bpdtsApp');

chai.use(chaiAsPromised);

const expect = chai.expect;

const baseURL = config.get('services.bpdtsApp.baseURL');

describe('Endpoint - bpdtsApp', () => {
    before(() => {
        nock.disableNetConnect();
    });

    afterEach(() => {
        nock.cleanAll();
    })
    
    after(() => {
        nock.enableNetConnect();
    });

    describe('#getUsers()', () => {
        it('should return a list of users when the service request is successful', async() => {
            const user = {
                id: 1,
                first_name: 'Maurise',
                last_name: 'Shieldon',
                email: 'mshieldon0@squidoo.com',
                ip_address: '192.57.232.111',
                latitude: 34.003135,
                longitude: -117.7228641,
            };
            
            const scope = nock(baseURL)
                .get('/users')
                .reply(HttpStatus.OK, [user]);

            const response = await bpdtsApp.getUsers();

            expect(scope.isDone()).to.be.true;

            expect(response).to.be.an('array').with.lengthOf(1);
            expect(response[0]).to.deep.equal(user);
        });

        it('should throw an error when the service request fails', async() => {
            nock(baseURL)
                .get('/users')
                .reply(HttpStatus.INTERNAL_SERVER_ERROR);

            await expect(bpdtsApp.getUsers()).to.eventually.be.rejectedWith(Error, 'Request failed with status code 500');
        });
    });

    describe('#getUsersByCity()', () => {
        it('should reutrn a list of users when the service request is successful', async() => {
            const city = 'London';
            
            const user = {
                id: 1,
                first_name: 'Maurise',
                last_name: 'Shieldon',
                email: 'mshieldon0@squidoo.com',
                ip_address: '192.57.232.111',
                latitude: 34.003135,
                longitude: -117.7228641,
            };
            
            const scope = nock(baseURL)
                .get(`/city/${city}/users`)
                .reply(HttpStatus.OK, [user]);

            const response = await bpdtsApp.getUsersByCity(city);

            expect(scope.isDone()).to.be.true;

            expect(response).to.be.an('array').with.lengthOf(1);
            expect(response[0]).to.deep.equal(user);
        });

        it('should throw an error when no city is provided', async() => {
            const city = null;

            await expect(bpdtsApp.getUsersByCity(city)).to.eventually.be.rejectedWith(Error, 'A city must be provided.');
        });

        it('should throw an error when the service request fails', async() => {
            const city = 'London';

            nock(baseURL)
                .get(`/city/${city}/users`)
                .reply(HttpStatus.INTERNAL_SERVER_ERROR);

            await expect(bpdtsApp.getUsersByCity(city)).to.eventually.be.rejectedWith(Error, 'Request failed with status code 500');
        });
    });
});
