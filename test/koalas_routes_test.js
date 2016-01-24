const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/koalas_test';
const Koala = require(__dirname + '/../models/koala');
const server = require(__dirname + '/../server');

describe('The koala api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    });
  });

  it('should be able to retrieve all our koalas', (done) => {
    request('localhost:3000')
      .get('/api/koalas')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should be able to create a koala', (done) => {
    request('localhost:3000')
      .post('/api/koalas')
      .send({ name: 'test koala' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test koala');
        expect(res.body).to.contain.keys(['_id', 'accent', 'age', 'color', 'friends']);
        done();
      });
  });

  describe('requests that require a populated DB', () => {
    beforeEach((done) => {
      Koala.create({name: 'test koala'}, (err, data) => {
        this.testKoala = data;
        done();
      });
    });

    it('should be able to update a koala', (done) => {
      request('localhost:3000')
        .put('/api/koalas/' + this.testKoala._id)
        .send({ name: 'new koala name' })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a koala', (done) => {
      request('localhost:3000')
        .delete('/api/koalas/' + this.testKoala._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });
});
