import cheerio from 'cheerio';
import rp from 'request-promise';
import UserAgent from 'user-agents';

const scrape = async ({ currentPage = 1 }) => {
  const newResults = {
    siteName: 'Test Request',
    handle: 'test_request',
    uri: 'https://google.com',
    events: [],
  };
  const userAgent = new UserAgent();
  const options = {
    uri: `https://google.com?page=${currentPage}`,
    headers: {
      'User-Agent': userAgent.toString(),
    },
    transform: (body) => cheerio.load(body),
  };
  const $ = await rp(options);
  newResults.links = $('a').text();

  console.dir(newResults.links, { depth: 15 });
  return newResults;
};

export default scrape;
