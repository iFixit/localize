import { _js, setTranslations } from "../dist/translations.js";
import { strict as assert } from 'assert';

const translatedHi = "Translated Hi (%1)";

setTranslations({Hi: translatedHi});
assert.equal("Translated Hi (param)", _js("Hi", "param"));
