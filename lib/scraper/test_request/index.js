import cheerio from 'cheerio';
import rp from 'request-promise';
import UserAgent from 'user-agents';

const scrape = async ({ currentPage = 1 }) => {
  const newResults = {
    siteName: 'Test Request',
    handle: 'test_request',
    uri: 'https://hecmedia.org',
    events: [],
  };
  const userAgent = new UserAgent();
  const options = {
    method: 'get',
    uri: `https://hecmedia.org?page=${currentPage}`,
    headers: {
      'User-Agent': userAgent.toString(),
    },
    timeout: 60000,
    resolveWithFullResponse: true,
    transform: (body) => cheerio.load(body),
  };
  try {
    const $ = await rp(options);
    newResults.links = $('a').text();
    return newResults;
  } catch (err) {
    return {
      error: `Cannot scrape ${err.message}`,
    };
  }
};

export default scrape;
