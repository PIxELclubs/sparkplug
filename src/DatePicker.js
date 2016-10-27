import React from 'react';
import DatePicker from 'material-ui/DatePicker/DatePicker';

const dtf = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

export const formatDate = date => dtf.format(date);

export default class LongMonthDatePicker extends DatePicker {}

LongMonthDatePicker.defaultProps = {
  ...DatePicker.defaultProps,
  formatDate
};
