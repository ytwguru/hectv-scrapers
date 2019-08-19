import dayjs from 'dayjs';

import validationScrapeData from '../index';

test('should validate valid data', () => {
  validationScrapeData({
    siteName: 'Test site name',
    handle: 'test_site',
    uri: 'https://example.com',
    events: [{
      uri: 'https://example.com',
      eventName: 'Test event 1',
      handle: 'test_handle',
      date: dayjs().format(),
      address: {
        address1: '123 Test St.',
        address2: 'Suite test',
        city: 'St. Louis',
        state: 'MO',
        zip: '97211',
      },
      phone: '555-123-4567',
      description: 'Test description of event 1',
    }],
  });
});
