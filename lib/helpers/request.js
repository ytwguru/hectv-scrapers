import nodeFetch from 'node-fetch';
import { getRandom } from 'random-useragent';

const { SCRAPER_USER_AGENT } = process.env;

export const delay = (milliseconds = 3000) => (
  new Promise((res) => setTimeout(res, Math.floor(Math.random() * milliseconds)))
);

export const fetch = (url, options = {}) => nodeFetch(url, Object.assign(options, {
  headers: {
    'User-Agent': SCRAPER_USER_AGENT || getRandom(),
  },
}));
