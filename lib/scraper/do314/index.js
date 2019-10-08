import cheerio from 'cheerio';
import dayjs from 'dayjs';
import { clean } from '../../helpers/response';

const scrape = async ({
  fetch,
  results,
  limit,
  currentPage = '2018-08-15',
}) => {
  const newResults = results || {
    siteName: 'do314',
    handle: 'do314',
    uri: 'https://do314.com',
    events: [],
  };
  const date = dayjs(currentPage, 'YYYY-MM-DD').format('YYYY/MM/DD');
  const res = await fetch(`https://do314.com/events/${date}`);
  const text = await res.text();
  let $listings = cheerio.load(text)(
    '.ds-event-listings .ds-events-page > .ds-events-group > .ds-listing',
  );
  if (!$listings.length) {
    return newResults;
  }

  if (limit) {
    $listings = $listings.slice(0, limit);
  }

  const responses = await Promise.all(
    $listings.toArray().map(
      (e) => new Promise((resolve) => async () => {
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

          const evRes = await fetch(href);
          const evText = await evRes.text();
          const $ = cheerio.load(evText);

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

            const locationResp = await fetch(locationHref);
            const locationText = await locationResp.text();

            const l$ = cheerio.load(locationText);
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

  console.dir(responses, { depth: 15 });
  return newResults;
};

export default scrape;
