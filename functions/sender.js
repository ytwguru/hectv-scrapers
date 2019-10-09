import { SQS } from 'aws-sdk';
import { success, error } from '../lib/helpers/response';

const { REGION, QUEUE_NAME } = process.env;
const sqs = new SQS({
  region: { REGION },
});

export const queue = async (event, context) => {
  try {
    const { pathParameters: { id, page } = {} } = event;
    const accountId = context['account-id'];
    const queueUrl = `https://sqs.us-east-1.amazonaws.com/${accountId}/${QUEUE_NAME}`;

    // SQS message parameters
    const params = {
      MessageBody: JSON.stringify({ id, page }),
      QueueUrl: queueUrl,
    };

    const data = await sqs.sendMessage(params).promise();
    return success({
      message: `Sent to ${queueUrl}`,
      messageId: data.MessageId,
      context,
    });
  } catch (err) {
    return error({
      message: '',
      context,
    });
  }
};

export default (event) => success(event);
