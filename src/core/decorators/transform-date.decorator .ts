import { Transform } from 'class-transformer';

import * as moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';

export function TransformDate() {
  return Transform(value => moment(value).format(DATE_FORMAT), {
    toPlainOnly: true,
  });
}
