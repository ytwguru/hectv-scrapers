import { sqsSuccess, sqsError } from '../lib/helpers/response';
import riverfrontScraper from '../lib/scraper/riverfront_times';
import testRequest from '../lib/scraper/test_request';
import do314 from '../lib/scraper/do314';
import validate from '../lib/validation/scrapedata';
import store from '../lib/store';
import db from '../lib/models';

export const scrape = async (event) => {
  /* eslint global-require: ["off"] */
  const parsedBody = JSON.parse(event.Records[0].body);
  const { id, page } = parsedBody || {};
  let scrapeResult = [];
  try {
    await db.sequelize.authenticate();
  } catch (err) {
    console.log('Unable to connect to the database: ', err.message);
  }
  switch (id) {
    case 'riverfronttimes':
      try {
        scrapeResult = await riverfrontScraper({ currentPage: page });
      } catch (err) {
        return sqsError({
          errorMessage: `Unable to scrape the site. ${err.message}`,
        });
      }
      break;
    case 'testRequest':
      scrapeResult = await testRequest({ currentPage: page });
      return sqsSuccess({
        success: scrapeResult,
      });
    case 'do314':
      try {
        scrapeResult = await do314({ currentPage: page });
      } catch (err) {
        return sqsError({
          errorMessage: `Unable to scrape the site. ${err.message}`,
        });
      }
      break;
    default:
      return sqsError({ errorMessage: 'The requested site is not supported.' });
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
    return sqsError({ errorMessage: 'Cannot validate the results.' });
  } catch (err) {
    return sqsError({
      errorMessage: `Cannot store the results: ${err.message}`,
    });
  }
};

export default (event) => sqsSuccess(event);
