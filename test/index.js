const request = require("supertest");
const test = require('tape');
const assert = require("assert")
const app = require('../server');

const VALID_ROUTE = '/weather/101.45/-2.5';
const INVALID_ROUTE = '/weather/181/-91';

test('--- Routed correctly ---', (t) => {
  request(app)
    .get(VALID_ROUTE)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error');
      t.end();
    })
});

test('--- Return "500" if API returns error ---', (t) => {
  request(app)
    .get(INVALID_ROUTE)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(500)
    .end((err, res) => {
      t.error(err, 'No error');
      t.end();
    })
});

test('--- Return "There is an error on the returned API" if API returns error ---', (t) => {
  request(app)
    .get(INVALID_ROUTE)
    .set('Accept', 'application/json')
    .expect(function(res) 
    {
      let error = JSON.parse(res.error.text);
      assert.equal(error.error,'There is an error on the returned API');
    })
    .end((err, res) => {
      t.error(err, 'No error');
      t.end();
    })
});

test('--- Return "500" if API Key is empty ---', (t) => {
  process.env.API_KEY = "";
  request(app)
    .get(VALID_ROUTE)
    .set('Accept', 'application/json')
    .expect(500)
    .end((err, res) => {;
      t.error(err, 'No error');
      t.end();
    })
});

test('--- Return "Missing API Key" if API Key is empty ---', (t) => {
  process.env.API_KEY = "";
  request(app)
    .get(VALID_ROUTE)
    .set('Accept', 'application/json')
    .expect(function(res) 
    {
      let error = JSON.parse(res.error.text);
      assert.equal(error.error,'Missing API Key');
    })
    .end((err, res) => {;
      t.error(err, 'No error');
      t.end();
    })
});
