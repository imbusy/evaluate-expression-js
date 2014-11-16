var should = require('chai').should(),
    evaluate = require('../index').evaluate
    
describe('encode', function() {
   it('returns the number when there are no operators', function() {
      evaluate('123').should.equal(123);
   });
   it('returns the negative of a number when preceded by a minus sign', function() {
      evaluate('-123').should.equal(-123);
   });
   it('returns the same number when preceded by a plus sign', function() {
      evaluate('+123').should.equal(123);
   });
   it('simple addition', function() {
      evaluate('123 + 245').should.equal(123 + 245);
   });
   it('simple subtraction', function() {
      evaluate('123 - 245').should.equal(123 - 245);
   });
   it('simple multiplication', function() {
      evaluate('123 * 245').should.equal(123 * 245);
   });
   it('simple division', function() {
      evaluate('123 / 245').should.equal(123 / 245);
   });
   it('complex expression: 10 + 2 * 3 / 4', function() {
      evaluate('10 + 2 * 3 / 4').should.equal(10 + 2 * 3 / 4);
   });
});
