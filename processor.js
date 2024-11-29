require('dotenv').config();
const { Client } = require('pg');

const event_names = ['install', 'purchase'];
const take = 100;

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  PROBABITION_API_KEY,
  PROBABITION_API_URL,
} = process.env;

const dbConnectionSettings = {
  user: DB_USERNAME,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
};

function generateUrl(params) {
  const url = new URL(PROBABITION_API_URL);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key]),
  );

  return url;
}

async function fetchData(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': PROBABITION_API_KEY,
      },
    });

    return res.json();
  } catch (error) {
    console.error(`Error fetching data (url: ${url}):`, error);
  }
}

function csvToObject(csv) {
  const data = csv.split('\n');
  const header = data.shift().split(',');

  return data.map((el) => {
    const parameters = el.split(',');
    return Object.assign(
      {},
      ...parameters.map((el, i) => ({
        [header[i]]: el,
      })),
    );
  });
}

async function insertData(data, db) {
  const queries = [];

  for (const item of data) {
    const {
      event_time,
      client_id,
      event_name,
      campaign,
      campaign_id,
      adgroup,
      adgroup_id,
      ad,
      ad_id,
    } = item;

    queries.push(
      db.query(
        `INSERT INTO campaign_reports (event_time, client_id, event_name, campaign, campaign_id, adgroup, adgroup_id, ad, ad_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT ON CONSTRAINT "UQ_campaign_reports" 
         DO UPDATE 
         SET campaign = $4, campaign_id = $5, adgroup = $6, adgroup_id = $7, ad = $8, ad_id = $9, "createdAt" = NOW()`,
        [
          event_time,
          client_id,
          event_name,
          campaign,
          campaign_id,
          adgroup,
          adgroup_id,
          ad,
          ad_id,
        ],
      ),
    );
  }

  return Promise.all(queries);
}

module.exports = async (job) => {
  const { from_date, to_date, is_user_initiated } = job.data;

  const message = is_user_initiated ? `User initiated` : `Cron`;
  console.log(
    `${message} data fetch started; dates:${from_date} - ${to_date}, id:${job.id}`,
  );

  const db = new Client(dbConnectionSettings);

  try {
    await db.connect();

    for (const event_name of event_names) {
      let url = generateUrl({ from_date, to_date, event_name, take });

      while (url) {
        const res = await fetchData(url);
        if (!res?.data?.csv) {
          url = null;
          continue;
        }

        const dataObj = csvToObject(res.data.csv);
        await insertData(dataObj, db);

        url = res.data.pagination ? res.data.pagination.next : null;
      }
    }
  } catch (error) {
    console.error(`Processing error (id:${job.id}):`, error);
    throw error;
  } finally {
    db.end();
  }

  console.log(
    `${message} data fetch successfully ended; dates: ${from_date} - ${to_date}, id:${job.id}`,
  );
};
