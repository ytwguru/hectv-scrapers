import nodeFetch from 'node-fetch';
import UserAgent from 'user-agents';

const userAgent = new UserAgent();

const headers = {
  'User-Agent': userAgent.toString(),
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
};

export const fetch = (url, options = {}) => nodeFetch(
  url,
  Object.assign(options, {
    headers,
    follow: 5,
    timeout: 10000,
  }),
);

export default fetch;
