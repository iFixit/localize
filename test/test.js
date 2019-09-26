const { add } = require('./window.translations.js');
var assert = require('assert');
const {_js, ___p} = require('../src/lib/translations.js');

describe('_js', function() {
   it('should translate!', function() {
      assert.equal('from', _js('from'));
      add('from', 'to');
      assert.equal('to', _js('from'));
   });
});

