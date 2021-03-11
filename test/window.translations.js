const translations = {};
window = {
   JsTranslations: translations
}

exports.add = function add(from, to) {
   translations[from] = to;
}
