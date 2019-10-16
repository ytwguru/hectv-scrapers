import cheerio from 'cheerio';
import dayjs from 'dayjs';
import rp from 'request-promise';
import UserAgent from 'user-agents';
import { clean } from '../../helpers/response';

const scrape = async ({ limit, currentPage = '2018-08-15' }) => {
  const newResults = {
    siteName: 'do314',
    handle: 'do314',
    uri: 'https://do314.com',
    events: [],
  };
  const date = dayjs(currentPage, 'YYYY-MM-DD').format('YYYY/MM/DD');
  const userAgent = new UserAgent();
  const options = {
    uri: `https://do314.com/events/${date}`,
    headers: {
      'User-Agent': userAgent.toString(),
    },
    timeout: 2000,
    transform: (body) => cheerio.load(body),
  };

  const $$ = await rp(options);
  let $listings = $$(
    '.ds-event-listings .ds-events-page > .ds-events-group > .ds-listing',
  );
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
        try {
          let href = clean(
            cheerio(e)
              .find('a.ds-listing-event-title.url')
              .attr('href'),
          );
          if (!href) {
            throw Error(
              `Unable to locate href from event: ${cheerio(e).html()}`,
            );
          }
          if (href.match(/^(http|https)/) === null) {
            href = `https://do314.com${href}`;
          }

          const userAgent2 = new UserAgent();
          const options2 = {
            uri: href,
            headers: {
              'User-Agent': userAgent2.toString(),
            },
            transform: (body) => cheerio.load(body),
          };
          const $ = await rp(options2);
          let address;
          let phone;
          let uri;
          let locationHref = clean(
            $(
              '.ds-event-meta [itemprop=location] .ds-venue-name a[itemprop=url]',
            ).attr('href'),
          );
          if (locationHref) {
            if (locationHref.match(/^(http|https)/) === null) {
              locationHref = `https://do314.com${locationHref}`;
            }
            const userAgent3 = new UserAgent();
            const lOptions = {
              uri: locationHref,
              headers: {
                'User-Agent': userAgent3.toString(),
              },
              transform: (body) => cheerio.load(body),
            };
            const l$ = await rp(lOptions);
            if (l$) {
              address = {
                address1: clean(
                  l$(
                    '.ds-detail-meta > .ds-detail-address > [itemprop=streetAddress]',
                  ).attr('content'),
                ),
                city: clean(
                  l$(
                    '.ds-detail-meta > .ds-detail-address > [itemprop=addressLocality]',
                  ).attr('content'),
                ),
                state: clean(
                  l$(
                    '.ds-detail-meta > .ds-detail-address > [itemprop=addressRegion]',
                  ).attr('content'),
                ),
                zip: clean(
                  l$(
                    '.ds-detail-meta > .ds-detail-address > [itemprop=postalCode]',
                  ).attr('content'),
                ),
              };
              phone = clean(
                (
                  l$('.ds-detail-meta > .ds-detail-phone > a').attr('href')
                    || ''
                ).replace('tel:', ''),
              );
              uri = clean(
                l$('.ds-detail-meta > .ds-detail-website > a').attr('href'),
              );
            }
          }
          const coverImage = $(
            '.ds-event-detail > .ds-event-detail-main .ds-cover-image',
          );
          let image = '';
          if (coverImage) {
            const style = coverImage.attr('style');
            let bgImageDQ = '';
            let bgImageSQ = '';

            if (style) {
              bgImageDQ = style.match(/background-image:.*url\("([^"]+)/);
              bgImageSQ = style.match(/background-image:.*url\('([^']+)/);
            }
            if (bgImageDQ && bgImageDQ.length > 1) {
              [, image] = bgImageDQ;
            } else if (bgImageSQ && bgImageSQ.length > 1) {
              [, image] = bgImageSQ;
            }
          }
          const startDate = clean(
            $(
              '.ds-event-detail > .ds-event-detail-main .ds-event-meta-container [itemprop=startDate]',
            ).attr('content'),
          );
          const endDate = clean(
            $(
              '.ds-event-detail > .ds-event-detail-main .ds-event-meta-container [itemprop=endDate]',
            ).attr('content'),
          );
          const displayDate = clean(
            $(
              '.ds-event-detail > .ds-event-detail-main .ds-event-meta-container .ds-event-time > span',
            ).attr('data-datetime'),
          );
          newResults.events.push({
            eventName: clean(
              $(
                '.ds-event-detail > .ds-event-detail-main .ds-event-title-text',
              ).text(),
            ),
            handle: href,
            date: displayDate,
            startDate: startDate || displayDate,
            endDate: endDate || displayDate,
            description: clean($('.ds-event-description-inner').text()),
            location: clean(
              $(
                '.ds-event-detail > .ds-event-detail-main .ds-venue-name [itemprop=name]',
              ).text(),
            ),
            price: clean(
              $(
                '.ds-event-detail > .ds-event-detail-main .ds-event-meta-container h2[itemprop=price]',
              ).attr('title'),
            ),
            address,
            phone,
            image,
            uri,
          });

          resolve(newResults);
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
