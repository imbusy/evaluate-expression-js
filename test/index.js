var should = require('chai').should(),
    evaluate = require('../index').evaluate
    
describe('encode', function() {
   it('returns the number when there are no operators', function() {
      evaluate('123').should.equal(123);
   });
});
