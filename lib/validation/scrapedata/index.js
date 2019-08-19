import Ajv from 'ajv';

const schema = require('./schema.json');

const ajv = new Ajv();

export default (data) => {
  if (!ajv.validate(schema, data)) {
    /* eslint-disable no-console */
    console.error(ajv.errorsText(ajv.errors));
    /* eslint-enable no-console */

    return false;
  }

  return true;
};
