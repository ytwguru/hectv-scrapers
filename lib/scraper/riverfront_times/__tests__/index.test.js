import { Response } from 'node-fetch';
import mock from 'fetch-mock';
import { readFileSync } from 'fs';
import scrape from '../index';

const fetchMock = mock.sandbox();
const expected = require('./data');

const fetch = fetchMock.mock(
  'https://riverfronttimes.com/stlouis/EventSearch?page=1',
  new Response(readFileSync(`${__dirname}/EventSearch.html`), { status: 'ok' }),
)
  .mock(
    'https://www.riverfronttimes.com/stlouis/steinberg-skating-rink/Event?oid=27705585',
    new Response(readFileSync(`${__dirname}/EventSearch_child_1.html`), { status: 'ok' }),
  )
  .mock(
    'https://www.riverfronttimes.com/stlouis/graphic-revolution-american-prints-1960-to-now/Event?oid=26995455',
    new Response(readFileSync(`${__dirname}/EventSearch_child_2.html`), { status: 'ok' }),
  );

test('scrape page', () => {
  jest.setTimeout(30000);
  expect.assertions(1);
  return scrape({
    fetch,
    maxPages: 1,
    limit: 2,
  }).then((data) => expect(data).toEqual(expected));
});
