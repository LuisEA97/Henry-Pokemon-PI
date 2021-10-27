const { Types, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Types model', () => {
    before(() => conn.authenticate()
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      }));
    describe('Validators', () => {
      beforeEach(() => Types.sync({ force: true }));
      describe('Creating types:', () => {
          it('Should create a type: ', done => {
            Types.create({
                id: 1,
                en: 'Just a type',
                es: 'Un tipo'
              })
              .then(type => {
                  expect(type.en).to.equal('Just a type')
                  done()
              })
              .catch(() => done())
          });
          it('Should NOT create a type without id: ', done => {
              Types.create({
                  en: 'Should not create this'
              })
                .then(() => done("It shouldn't be created"))
                .catch(() => done());
          })
      })
    });
  });
  