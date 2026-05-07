import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { _js } from '../src/translations.js';

test('_js: falls back to returning the input string when no translations are set', (t) => {
   const errors = [];
   t.mock.method(console, 'error', (msg) => errors.push(msg));
   assert.equal(_js('Hello'), 'Hello');
   assert.equal(errors.length, 1);
   assert.match(errors[0], /UI Translations not found/);
});

test('_js: only logs the missing-translations warning once', (t) => {
   const errors = [];
   t.mock.method(console, 'error', (msg) => errors.push(msg));
   _js('first');
   _js('second');
   assert.equal(errors.length, 0);
});
