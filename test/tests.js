var assert = require('assert');
var request = require('supertest');
//var chai = require('chai');
var app = require('../app.js');

//var expect = chai.expect;
var request = request('http://tap-octavioricci820054.codeanyapp.com:8080');

describe('users', function(){
  describe('GET', function(){
    if('Should return all users in JSON format', function(done){
      request.get('/api/users')
        .expect('Content-Type',/json/)
        .expect('200',done);
    });
  });
});

