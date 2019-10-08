import cheerio from 'cheerio';

const scrape = async ({ fetch, currentPage = 1 }) => {
  const newResults = {
    siteName: 'Test Request',
    handle: 'test_request',
    uri: 'https://google.com',
    events: [],
  };
  const res = await fetch(`https://google.com?page=${currentPage}`);
  const text = await res.text();
  const links = cheerio.load(text)('a');
  newResults.links = links.text();

  console.dir(newResults.links, { depth: 15 });
  return newResults;
};

export default scrape;
