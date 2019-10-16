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
    uri: `https://hecmedia.org?page=${currentPage}`,
    headers: {
      'User-Agent': userAgent.toString(),
    },
    timeout: 2000,
    transform: (body) => cheerio.load(body),
  };
  const $ = await rp(options);
  newResults.links = $('a').text();

  console.dir(newResults.links, { depth: 15 });
  return newResults;
};

export default scrape;
