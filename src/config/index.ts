import * as dotenv from 'dotenv';
dotenv.config();

import database from './database';
import system from './system';
import probabitionApi from './probabitionApi';

export default () => ({
  database,
  system,
  probabitionApi,
});
