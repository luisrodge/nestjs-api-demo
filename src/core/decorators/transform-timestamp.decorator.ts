import { Transform } from 'class-transformer';

import * as moment from 'moment';

const TIMESTAMP_FORMAT = 'YYYY-MM-DDTHH:mm:ss[Z]';

export function TransformTimestamp() {
  return Transform((value) => moment(value).format(TIMESTAMP_FORMAT), {
    toPlainOnly: true,
  });
}
