import moment, { Moment } from 'moment';
import isString from 'lodash.isstring';

/**
 * Accepts an AMAZON.DATE string
 * (see https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#date)
 * and converts it into the best approximation
 * of a Moment.js instance.
 * @param amazonDate The AMAZON.DATE string value
 */
export const normalize = (amazonDate: string): Moment => {
  if (!isString(amazonDate)) {
    return moment.invalid();
  }

  if (/^\d{4}-W\d{1,2}-WE$/.test(amazonDate)) {
    // for specific weekends, like "this weekend",
    // eventDate will look like "2017-W49-WE"

    // remove the -WE suffix and add 5 days
    return moment(amazonDate.replace(/-WE$/, '')).add(5, 'days');
  } else if (/^\d{3}X$/.test(amazonDate)) {
    // for decades, eventDate will look like '201X'

    // just replace the X with a 0 to signify
    // the start of the decade
    return moment(amazonDate.replace('X', '0'));
  } else if (/^\d{4}-(WI|SP|SU|FA)$/.test(amazonDate)) {
    // for seasons, eventDate will look like '2018-SP'

    // transform the date into an exact date, like "2018-03-21"
    return moment(
      amazonDate
        .replace(/WI$/, '12-21')
        .replace(/SP$/, '03-21')
        .replace(/SU$/, '06-21')
        .replace(/FA$/, '09-21'),
    );
  } else if (/^\d{4}-\d{2}-XX$/.test(amazonDate)) {
    // some locales return a "month" value - like "next month" -
    // like "2018-11-XX"

    return moment(amazonDate.replace(/XX$/, '01'));
  } else if (/^\d{4}-XX-XX$/.test(amazonDate)) {
    // some locales return a "year" value - like "next year" -
    // like "2018-XX-XX"

    return moment(amazonDate.replace(/XX-XX$/, '01-01'));
  } else if (amazonDate === 'PRESENT_REF') {
    // if the user said "now"

    // convert the date into the expected format
    return moment();
  } else {
    return moment(amazonDate);
  }
};
