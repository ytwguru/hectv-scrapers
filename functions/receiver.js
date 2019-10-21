import { sqsSuccess, sqsError } from '../lib/helpers/response';
import riverfrontScraper from '../lib/scraper/riverfront_times';
import testRequest from '../lib/scraper/test_request';
import do314 from '../lib/scraper/do314';
import validate from '../lib/validation/scrapedata';
import store from '../lib/store';

if (process.env._X_AMZN_TRACE_ID) {
  const AWSXRay = require('aws-xray-sdk');
  const AWS = AWSXRay.captureAWS(require('aws-sdk'));
  const https = require('https');
  AWSXRay.captureHTTPsGlobal(https);

  const getKeepAliveAgent = () => {
    const options = {
      keepAlive: true,
      maxSockets: 50, // from aws-sdk
      rejectUnauthorized: true, // from aws-sdk
    };
    const agent = new https.Agent(options);
    agent.setMaxListeners(0); // from aws-sdk
    return agent;
  };

  AWS.config.update({
    httpOptions: {
      agent: getKeepAliveAgent(),
    },
  });
}

export const scrape = async (event) => {
  /* eslint global-require: ["off"] */
  const db = require('../lib/models').default;
  console.dir(event);
  const parsedBody = JSON.parse(event.Records[0].body);
  const { id, page } = parsedBody || {};
  let scrapeResult = [];
  try {
    await db.sequelize.authenticate();
  } catch (err) {
    console.log('Unable to connect to the database: ', err.message);
    return sqsError({
      errorMessage: `Unable to connect to the database: ${err.message}`,
      event,
    });
  }
  switch (id) {
    case 'riverfronttimes':
      try {
        scrapeResult = await riverfrontScraper({ currentPage: page });
      } catch (err) {
        return sqsError({
          errorMessage: `Unable to scrape the site. ${err.message}`,
          event,
        });
      }
      break;
    case 'testResponse':
      return sqsSuccess({
        success: 'Completed',
      });
    case 'testRequest':
      try {
        scrapeResult = await testRequest({ currentPage: page });
        return sqsSuccess({
          success: scrapeResult,
        });
      } catch (err) {
        return sqsError({
          errorMessage: `Unable to scrape the site. ${err.message}`,
          event,
        });
      }
    case 'do314':
      try {
        scrapeResult = await do314({ currentPage: page });
      } catch (err) {
        return sqsError({
          errorMessage: `Unable to scrape the site. ${err.message}`,
          event,
        });
      }
      break;
    default:
      return sqsError({
        errorMessage: 'The requested site is not supported.',
        event,
      });
  }
  try {
    if (validate(scrapeResult)) {
      await store({ db, data: scrapeResult });
      return sqsSuccess({
        success: `${
          scrapeResult.events ? scrapeResult.events.length : 0
        } results created`,
      });
    }
    return sqsError({
      errorMessage: 'Cannot validate the results.',
      event,
    });
  } catch (err) {
    return sqsError({
      errorMessage: `Cannot store the results: ${err.message}`,
      event,
    });
  }
};

export default (event) => sqsSuccess(event);
