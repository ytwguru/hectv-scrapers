import { Response } from 'node-fetch';
import mock from 'fetch-mock';
import { readFileSync } from 'fs';
import scrape from '../index';

const fetchMock = mock.sandbox();
const expected = require('./data');

const fetch = fetchMock.mock(
  'https://do314.com/events/2018/12/19',
  new Response(readFileSync(`${__dirname}/events.html`), { status: 'ok' }),
)
  .mock(
    'https://do314.com/events/2018/12/19/tab-benoit-with-guest-tbd',
    new Response(readFileSync(`${__dirname}/events_child_1.html`), { status: 'ok' }),
  )
  .mock(
    'https://do314.com/events/2018/12/19/8th-annual-beer-christmas',
    new Response(readFileSync(`${__dirname}/events_child_2.html`), { status: 'ok' }),
  )
  .mock(
    'https://do314.com/venues/the-old-rock-house',
    new Response(readFileSync(`${__dirname}/events_venue_1.html`), { status: 'ok' }),
  )
  .mock(
    'https://do314.com/venues/handlebar',
    new Response(readFileSync(`${__dirname}/events_venue_2.html`), { status: 'ok' }),
  );

test('scrape page', () => {
  jest.setTimeout(30000);
  expect.assertions(1);
  return scrape({
    fetch,
    limit: 2,
    currentPage: '2018-12-19',
  }).then((data) => expect(data).toEqual(expected));
});
