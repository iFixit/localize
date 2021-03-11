const { add } = require('./window.translations.js');
var assert = require('assert');
const {_js, ___p} = require('../src/translations.js');

describe('_js', function() {
   it('should translate!', function() {
      add('from', 'to');
      assert.equal('to', _js('from'));
   });

   it('should fallback to english!', function() {
      assert.equal('not translated', _js('not translated'));
   });

   describe("parameters", function() {
      it('should be replaced with args', function() {
         assert.equal('before ME! after', _js('before %1 after', 'ME!'));
      });
      it('should be replaced when used more than once', function() {
         assert.equal('me me me', _js('%1 %1 %1', 'me'));
      });
   });

   it('should collapse spaces', function() {
      add('many spaces', 'only one space');
      assert.equal('only one space', _js('many     spaces'));
   });

   it('should collapse spaces when falling back', function() {
      assert.equal('just one space', _js('just one    space'));
   });
});

