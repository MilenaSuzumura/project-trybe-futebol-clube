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
      'authorization': ''
    }))

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Token not found' });
  });

  it('Testa se o usuario não consegue alterar sem passar um id do time existente', async function () {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc0NzYyNzI4LCJleHAiOjE2NzQ3NjYzMjh9.27rm51QtjFd-HIb-xwOovk8O5wlqXuzxm1p6fWZkk-4'
    
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc0NzYyNzI4LCJleHAiOjE2NzQ3NjYzMjh9.27rm51QtjFd-HIb-xwOovk8O5wlqXuzxm1p6fWZkk-4'
    
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
})
