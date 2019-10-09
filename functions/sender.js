import { SQS } from 'aws-sdk';
import { success, error } from '../lib/helpers/response';

const { REGION, QUEUE_NAME } = process.env;
const sqs = new SQS();

export const queue = async (event, context) => {
  try {
    const { pathParameters: { id, page } = {} } = event;
    const { invokedFunctionArn } = context || {};
    const accountId = invokedFunctionArn && invokedFunctionArn.split(':')[4];
    if (accountId) {
      const queueUrl = `https://sqs.${REGION}.amazonaws.com/${accountId}/${QUEUE_NAME}`;
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
    }
    return error({
      message: '',
      errorMessage: `Invalid accountId: ${accountId}`,
    });
  } catch (err) {
    return error({
      message: '',
      errorMessage: err.message,
    });
  }
};

export default (event) => success(event);
