function buildResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  };
}

export const clean = (value) => ((value && value.length) ? value.trim() : '');
export const error = (body) => buildResponse(400, body);
export const failure = (body) => buildResponse(500, body);
export const success = (body) => buildResponse(200, body);
