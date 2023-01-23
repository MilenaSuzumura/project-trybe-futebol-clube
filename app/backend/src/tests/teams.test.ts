import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import teams from './mockes/teams';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

chai.use(chaiHttp);

beforeEach(() => sinon.restore());
beforeEach(() => sinon.restore());

describe('Testando a rota Teams', () => {
  it('Testa se retorna todos os teams no getTeams', async function () {
    const response = await (chai.request(app).get('/teams'));

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teams.allTeams);
  });

  it('Testa se, ao mandar o id 1, retorna o time com id 1', async function () {
    const response = await (chai.request(app).get('/teams/1'));

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teams.allTeams[0]);
  });
});
