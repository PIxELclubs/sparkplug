import React from 'react';
import DatePicker from 'material-ui/DatePicker/DatePicker';
import formatDate from '../format-date';

const LongMonthDatePicker = props => (
  <DatePicker {...props} />
);

LongMonthDatePicker.defaultProps = {
  formatDate
};

export default LongMonthDatePicker;
