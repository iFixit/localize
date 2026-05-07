import { test, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { _js, ___p, setTranslations } from '../src/translations.js';

beforeEach(() => {
   setTranslations({});
   delete globalThis.window;
});

afterEach(() => {
   delete globalThis.window;
});

test('_js: returns the input string when no translation matches', () => {
   assert.equal(_js('Hello'), 'Hello');
});

test('_js: returns the translated string when a match is found', () => {
   setTranslations({ Hello: 'Hola' });
   assert.equal(_js('Hello'), 'Hola');
});

test('_js: collapses runs of whitespace before lookup', () => {
   setTranslations({ 'Foo bar baz': 'translated' });
   assert.equal(_js('Foo   bar\n\tbaz'), 'translated');
});

test('_js: returns the compacted string when no match found', () => {
   assert.equal(_js('Foo   bar'), 'Foo bar');
});

test('_js: substitutes a single %1 placeholder', () => {
   setTranslations({ Hi: 'Translated Hi (%1)' });
   assert.equal(_js('Hi', 'param'), 'Translated Hi (param)');
});

test('_js: substitutes multiple positional placeholders', () => {
   assert.equal(_js('a %1 b %2', 'x', 'y'), 'a x b y');
});

test('_js: replaces every occurrence of a placeholder', () => {
   assert.equal(_js('%1 and %1', 'foo'), 'foo and foo');
});

test('_js: coerces non-string input via String()', () => {
   assert.equal(_js(42), '42');
});

test('_js: returns "Translated" when window.App.showTranslatedPlaceholder is set', () => {
   globalThis.window = { App: { showTranslatedPlaceholder: true } };
   setTranslations({ x: 'translated x' });
   assert.equal(_js('x'), 'Translated');
});

test('_js: ignores window.App when the placeholder flag is falsy', () => {
   globalThis.window = { App: { showTranslatedPlaceholder: false } };
   setTranslations({ x: 'translated x' });
   assert.equal(_js('x'), 'translated x');
});

test('___p: uses the singular form when number === 1', () => {
   assert.equal(___p(1, '%1 step', '%1 steps', 1), '1 step');
});

test('___p: uses the plural form when number === 0', () => {
   assert.equal(___p(0, '%1 step', '%1 steps', 0), '0 steps');
});

test('___p: uses the plural form when number > 1', () => {
   assert.equal(___p(5, '%1 step', '%1 steps', 5), '5 steps');
});

test('___p: forwards args to _js for translation lookup', () => {
   setTranslations({ '%1 step': 'TS:%1', '%1 steps': 'TP:%1' });
   assert.equal(___p(1, '%1 step', '%1 steps', 7), 'TS:7');
   assert.equal(___p(2, '%1 step', '%1 steps', 7), 'TP:7');
});

test('setTranslations: replaces the translation table on each call', () => {
   setTranslations({ a: 'first' });
   assert.equal(_js('a'), 'first');
   setTranslations({ a: 'second' });
   assert.equal(_js('a'), 'second');
});
