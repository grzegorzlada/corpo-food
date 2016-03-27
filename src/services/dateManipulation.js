'use strict';
exports.mapHourToDate = hour => {
    const [hours, minutes] = hour.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    return date;
};
