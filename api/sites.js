import { success } from '../lib/response';

export const scrape = async (event) => success({
  message: 'Go Serverless v1.0! Your function executed successfully!',
  input: event,
});

export default (event) => success(event);
