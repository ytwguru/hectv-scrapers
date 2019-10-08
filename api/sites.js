import { fetch } from '../lib/helpers/request';
import { success, error } from '../lib/helpers/response';
import riverfrontScraper from '../lib/scraper/riverfront_times';
import do314 from '../lib/scraper/do314';
import validate from '../lib/validation/scrapedata';
import store from '../lib/store';

export const scrape = async (event) => {
  /* eslint global-require: ["off"] */
  const db = require('../lib/models').default;
  const { pathParameters: { id, page } = {} } = event;
  let scrapeResult = [];
  try {
    await db.sequelize.authenticate();
  } catch (err) {
    console.log('Unable to connect to the database: ', err.message);
  }
  switch (id) {
    case 'riverfronttimes':
      try {
        scrapeResult = await riverfrontScraper({ fetch, currentPage: page });
      } catch (err) {
        return error({
          errorMessage: `Unable to scrape the site. ${err.message}`,
        });
      }
      break;
    case 'do314':
      try {
        scrapeResult = await do314({ fetch, currentPage: page });
      } catch (err) {
        return error({
          errorMessage: `Unable to scrape the site. ${err.message}`,
        });
      }
      break;
    default:
      return error({ errorMessage: 'The requested site is not supported.' });
  }
  try {
    if (validate(scrapeResult)) {
      await store({ db, data: scrapeResult });
      return success({
        success: `${
          scrapeResult.events ? scrapeResult.events.length : 0
        } results created`,
      });
    }
    return error({ errorMessage: 'Cannot validate the results.' });
  } catch (err) {
    return error({ errorMessage: `Cannot store the results: ${err.message}` });
  }
};

export default (event) => success(event);
