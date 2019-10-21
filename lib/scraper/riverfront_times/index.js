import cheerio from 'cheerio';
import rp from 'request-promise';
import UserAgent from 'user-agents';
import { clean } from '../../helpers/response';

const scrape = async ({ currentPage = 1, limit }) => {
  const newResults = {
    siteName: 'Riverfront Times',
    handle: 'riverfront_times',
    uri: 'https://riverfronttimes.com',
    events: [],
  };
  const userAgent = new UserAgent();
  const options = {
    method: 'get',
    uri: `https://riverfronttimes.com/stlouis/EventSearch?page=${currentPage}`,
    headers: {
      'User-Agent': userAgent.toString(),
    },
    timeout: 60000,
    resolveWithFullResponse: true,
    transform: (body) => cheerio.load(body),
  };

  const $l = await rp(options);
  let $listings = $l('#searchResults > .results-container > .EventListing');
  if (!$listings.length) {
    return newResults;
  }

  if (limit) {
    $listings = $listings.slice(0, limit);
  }

  await Promise.all(
    /* eslint no-async-promise-executor: ["off"] */
    $listings.toArray().map(
      (e) => new Promise(async (resolve) => {
        const $$ = cheerio(e);
        const href = $$.find('> .listing > h3 > a').attr('href');
        const imgTag = $$.find('> .imageTools > .listingImage > img').attr(
          'src',
        );

        let image = '';
        if (!href) {
          throw Error(`Unable to locate href from event: ${$$.html()}`);
        }
        if (imgTag) {
          image = imgTag;
        }
        try {
          const TEXT_NODE_TYPE = 3;
          const userAgent2 = new UserAgent();
          const pageOptions = {
            uri: href,
            headers: {
              'User-Agent': userAgent2.toString(),
            },
            transform: (body) => cheerio.load(body),
          };

          const $ = await rp(pageOptions);
          const date = clean(
            $('#EventMetaData > .eventWhen')
              .contents()
              .filter((idx, el) => el.nodeType === TEXT_NODE_TYPE)
              .text(),
          );
          newResults.events.push({
            eventName: clean(
              $('#EventMetaData > .EventDetails > .listingTitle')
                .contents()
                .filter((idx, el) => el.nodeType === TEXT_NODE_TYPE)
                .text(),
            ),
            handle: href,
            uri: clean(
              $(
                '#EventLocation > ul > .locationItem > ul > li > .locationUrl > a',
              ).attr('href'),
            ),
            price: clean(
              $('#EventMetaData > .eventPrice')
                .contents()
                .filter((idx, el) => el.nodeType === TEXT_NODE_TYPE)
                .text(),
            ),
            description: (() => {
              const $descr = $('#EventDescription > .descr_txt');
              $descr
                .contents()
                .filter(
                  (idx, el) => el.attribs && el.attribs.class === 'author_txt',
                )
                .remove();
              return clean($descr.html());
            })(),
            location: clean(
              $('#EventLocation > ul > .locationItem > h4 > a').text(),
            ),
            address: {
              address1: clean(
                $(
                  '#EventLocation > ul > .locationItem > ul > .adr > .street-address',
                ).text(),
              ),
              address2: clean(
                $(
                  '#EventLocation > ul > .locationItem > ul > .adr > .extended-address',
                ).text(),
              ),
              city: clean(
                $(
                  '#EventLocation > ul > .locationItem > ul > .adr > span > .locality',
                ).text(),
              ),
              state: clean(
                $(
                  '#EventLocation > ul > .locationItem > ul > .adr > .region',
                ).text(),
              ),
              zip: clean(
                $(
                  '#EventLocation > ul > .locationItem > ul > .adr .postal-address',
                ).text(),
              ),
            },
            phone: clean(
              $(
                '#EventLocation > ul > .locationItem > ul > li > .locationPhone > .value',
              ).text(),
            ),
            image,
            startDate: date,
            endDate: date,
            date,
          });
          resolve(true);
        } catch (err) {
          console.log('Unable to read content. ', err.message);

          resolve(err);
        }
      }),
    ),
  );

  return newResults;
};

export default scrape;
