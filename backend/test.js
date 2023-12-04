import app from "./index.js";
import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const request = supertest(app);

describe('Express App Tests', () => {
  it('should return "Hello World!" on /GET', async () => {
    const response = await request.get('/');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Hello World!');
  });

  it('should handle /login GET route', async () => {
    const response = await request.get('/login');
    expect(response.status).to.equal(200);
    // You can add more assertions based on the expected behavior of your login route
  });

  it('should handle /logout GET route', async () => {
    const response = await request.get('/logout');
    expect(response.status).to.equal(200);
    // You can add more assertions based on the expected behavior of your logout route
  });

  it('should handle /api/sessions/oauth/google GET route', async () => {
    // Mock a Google OAuth response or use a library like nock to simulate the external request
    const response = await request.get('/api/sessions/oauth/google');
    expect(response.status).to.equal(200);
    // You can add more assertions based on the expected behavior of your Google OAuth route
  });
});