const AWSXRay = require('aws-xray-sdk');

function composeMessage(body) {
  const message = JSON.stringify(body);
  if (process.env._X_AMZN_TRACE_ID) {
    AWSXRay.captureFunc('annotations', (subsegment) => {
      subsegment.addAnnotation('Response', message);
    });
  }
  return message;
}

function buildResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: composeMessage(body),
  };
}

function buildSQSMessage(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: composeMessage(body),
  };
}

export const clean = (value) => (value && value.length ? value.trim() : '');
export const error = (body) => buildResponse(400, body);
export const failure = (body) => buildResponse(500, body);
export const success = (body) => buildResponse(200, body);
export const sqsError = (body) => buildSQSMessage(400, body);
export const sqsFailure = (body) => buildSQSMessage(500, body);
export const sqsSuccess = (body) => buildSQSMessage(200, body);
export const getDate = (dateText) => {
  if (dateText) {
    const date = new Date(dateText);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  return '';
};
