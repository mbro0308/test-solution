const { expect } = require('chai');
const HttpStatus = require('http-status-codes');
const request = require('supertest');

const app = require('../../api/app');
const results = require('./results.json');

describe('Integration test', () => {
    it('should return an Ok status with a list of users', async() => {
        const response = await request(app)
            .get('/api/city/London/distance/50/users')
            .expect('Content-Type', /json/)
            .expect(HttpStatus.OK);

        expect(response.body).to.deep.equal(results);
    });
});
