import { success, error } from '../lib/helpers/response';

const awsXRay = require('aws-xray-sdk');
const AWS = awsXRay.captureAWS(require('aws-sdk'));

export const queue = async (event, context) => {
  let queueUrl = '';
  try {
    const { REGION, QUEUE_NAME } = process.env;
    const sqs = new AWS.SQS();
    const { pathParameters: { id, page } = {} } = event;
    const { invokedFunctionArn } = context || {};
    const accountId = invokedFunctionArn && invokedFunctionArn.split(':')[4];
    if (accountId) {
      queueUrl = `https://sqs.${REGION}.amazonaws.com/${accountId}/${QUEUE_NAME}`;
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
      errorMessage: `Can not create queueUrl: Invalid accountId: ${accountId}`,
    });
  } catch (err) {
    return error({
      message: '',
      errorMessage: `Error sending message to ${queueUrl}: ${err.message}`,
    });
  }
};

export default (event) => success(event);
