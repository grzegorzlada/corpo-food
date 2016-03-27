'use strict';
const locale = require('locale');
const localizationContent = require('../localizationContent');

const _getSupportedLocales = () => {
    const localesInContent = [];
    for (const localeInContent in localizationContent.resources) {
        localesInContent.push(localeInContent);
    }

    return new locale.Locales(localesInContent);
};

exports.getLocale = (req, res) => {
    locale.Locale.default = localizationContent.defaultLocale;

    const acceptableLocales = new locale.Locales(req.headers['accept-language']);

    res.json(acceptableLocales.best(_getSupportedLocales()));
};
