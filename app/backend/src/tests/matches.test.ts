import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import matches from './mockes/matches';

chai.use(chaiHttp);

const { expect } = chai;

chai.use(chaiHttp);

beforeEach(() => sinon.restore());

describe('Teste de Matches', () => {
  it('Testa se a rota get /matches retorna todas as partidas', async function () {
    const response = await (chai.request(app).get('/matches'));

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.length(matches.length);
  });

  it('Testa se dá erro ao tentar passar uma informação sem ter tokin', async function () {
    const response = await (chai.request(app).post('/matches').set({}))

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Token not found' });
  });

  it('Testa se dá erro ao tentar passar uma informação sem um tokin valido', async function () {
    const response = await (chai.request(app).post('/matches').set({
      'authorization': 'sadasdasdasdsa'
    }))

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token' });
  });

  it('Testa se o usuario não consegue alterar sem passar um id do time existente', async function () {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc0Nzc3MjEwLCJleHAiOjE2NzQ3ODA4MTB9.wfTRZWj7xDyH83zZQS7RPVAMa0JBVX9l7KJP6F2Ioso'
    
    const response = await (chai.request(app).post('/matches').set({
      'authorization': token
    }).send({
      "homeTeamId": 2,
      "awayTeamId": 55,
      "homeTeamGoals": 1,
      "awayTeamGoals": 2
    }));

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'There is no team with such id!' });
  });

  it('Testa se o usuario não consegue alterar se passar o id igual', async function () {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc0Nzc3MjEwLCJleHAiOjE2NzQ3ODA4MTB9.wfTRZWj7xDyH83zZQS7RPVAMa0JBVX9l7KJP6F2Ioso'
    
    const response = await (chai.request(app).post('/matches').set({
      'authorization': token
    }).send({
      "homeTeamId": 2,
      "awayTeamId": 2,
      "homeTeamGoals": 1,
      "awayTeamGoals": 2
    }));

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('Testa se o usuario consegue alterar com as informações certas', async function () {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc0Nzc3MjEwLCJleHAiOjE2NzQ3ODA4MTB9.wfTRZWj7xDyH83zZQS7RPVAMa0JBVX9l7KJP6F2Ioso'
    
    const response = await (chai.request(app).post('/matches').set({
      'authorization': token
    }).send({
      "homeTeamId": 2,
      "awayTeamId": 10,
      "homeTeamGoals": 1,
      "awayTeamGoals": 2
    }));

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.equal({
      "id": 49,
      "homeTeamId": 2,
      "awayTeamId": 10,
      "homeTeamGoals": 1,
      "awayTeamGoals": 2,
      "inProgress": true
    });
  });
})
