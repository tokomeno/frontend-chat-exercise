import moment from 'moment';

export const formatTime = (time: number) => {
  return moment(time).format('LLLL');
};

export const diffInMinute = (start: number, end: number) => {
  let startTime = moment(end);
  let endTime = moment(start);
  let duration = moment.duration(startTime.diff(endTime)).as('minutes');
  return duration;
};
