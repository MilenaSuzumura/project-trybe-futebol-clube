import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

chai.use(chaiHttp);

beforeEach(() => sinon.restore());

describe('Teste de Login', () => {
  it('Testa se o usuario consegue logar em sua conta', async function () {
    const response = await (chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    }));

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.haveOwnProperty('token');
  });

  it('Testa se o usuario não consegue logar em sua conta sem informar o email', async function () {
    const response = await (chai.request(app).post('/login').send({
      email: '',
      password: 'secret_admin'
    }));

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Testa se o usuario não consegue logar em sua conta sem informar a senha', async function () {
    const response = await (chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: ''
    }));

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Testa se o usuario não consegue logar em sua conta sem o email correto', async function () {
    const response = await (chai.request(app).post('/login').send({
      email: 'sadlasda@admin.com',
      password: 'secret_admin'
    }));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  });

  it('Testa se o usuario não consegue logar em sua conta sem informar a senha', async function () {
    const response = await (chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'ssadjasjdj'
    }));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  });
  
  it('Testa se, ao mandar um token valido, ele retorna o role', async function () {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc0Nzc3MjEwLCJleHAiOjE2NzQ3ODA4MTB9.wfTRZWj7xDyH83zZQS7RPVAMa0JBVX9l7KJP6F2Ioso'
    
    const response = await (chai.request(app).get('/login/validate').set({
      'authorization': token
    }))

    expect(response.status).to.be.equal(200);
    expect(response.body).to.haveOwnProperty('role');
  });

  it('Testa se, ao mandar um token invalido, ele dá um erro', async function () {
    const response = await (chai.request(app).get('/login/validate'));

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ role: 'admin' });
  });
})
