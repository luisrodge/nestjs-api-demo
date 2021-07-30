import { Transform } from 'class-transformer';

import * as moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';
const HUMAN_DATE_FORMAT = 'MMMM Do, YYYY';

export function TransformDate() {
  return Transform(value => moment(value).format(DATE_FORMAT), {
    toPlainOnly: true,
  });
}

export function TransformHumanDate() {
  return Transform(value => moment(value).format(HUMAN_DATE_FORMAT), {
    toPlainOnly: true,
  });
}
