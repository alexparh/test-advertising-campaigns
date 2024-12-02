const { NODE_ENV: env = 'production' } = process.env;
import { destination, stdTimeFunctions } from 'pino';

export default {
  level: env == 'production' ? 'info' : 'debug',
  timestamp: stdTimeFunctions.isoTime,
  stream: destination({
    dest: env == 'production' ? './logs/app.log' : 1,
    sync: false,
  }),
  transport:
    env == 'production'
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
};
