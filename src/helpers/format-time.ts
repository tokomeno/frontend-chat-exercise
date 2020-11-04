import moment from 'moment';

export const formatTime = (time: number) => {
  return moment(time).format('LT');
};
