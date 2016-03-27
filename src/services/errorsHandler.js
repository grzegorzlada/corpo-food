'use strict';
module.exports = errors => {
    const errorsDictionary = [];

    for (let property in errors) {
        if (errors.hasOwnProperty(property)) {
            errorsDictionary.push({property, message: errors[property].message});
        }
    }

    return errorsDictionary;
};
