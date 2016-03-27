import content from '../localizationContent.js';

const localization = (state, action) => {
    switch (action.type) {
    case 'CHANGE_LOCALE':
        if (action.locale === state.currentLocale) {
            return state;
        }

        if (!content.resources.hasOwnProperty(action.locale)) {
            throw 'no such locale as ' + action.locale;
        }

        return {
            currentLocale: action.locale,
            resources: {...content.resources[action.locale]}
        };
    default:
        if (!state) {
            return {
                currentLocale: content.defaultLocale,
                resources: {...content.resources[content.defaultLocale]}
            };
        }

        return state;
    }
};

export default localization;
