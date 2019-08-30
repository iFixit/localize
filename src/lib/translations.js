(function() {
   var UITranslations;

   if (!!window.JsTranslations) {
      UITranslations = window.JsTranslations;
   } else {
      const err = "UI Translations not found! Falling back to English...";
      console.error(err);
      const englishFallback = {};
      UITranslations = englishFallback;
   }

   /**
    * Translates an english string into the user's current language.
    *
    * Example: var buttonText = _js('Done');
    *          var buttonText = _js('Delete my %1', 'guide');
    *
    * This performs the translation on the client-side, which means that we
    * won't have to localize the js file into every language when it is built.
    */
   window._js = function(origString) {
      if (App.showTranslatedPlaceholder) {
         return 'Translated';
      }

      const compactedString = String(origString).replace(/\s{2,}/g, ' ');

      var translated = UITranslations[compactedString] || compactedString;

      // Handles replacements like _js("Text %1 text %2", "one", "two").
      var replacements = Array.prototype.slice.call(arguments, 1);

      return replacements.reduce(function(translated, replacement, i) {
         var search = new RegExp('%' + (i + 1), 'g');
         return translated.replace(search, replacement);
      }, translated);
   };

   /**
    * Uses one of two string formats to translate a string depending on whether
    * or not the `number` provided is singular.
    *
    * Example: var stepText = __p(stepCount, '%1 Step', '%1 Steps', stepCount);
    */
   window.___p = function(number, singleString, pluralString, ...args) {
      return number === 1
         ? _js(singleString, ...args)
         : _js(pluralString, ...args);
   };
})();
