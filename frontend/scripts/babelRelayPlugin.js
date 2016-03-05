const getBabelRelayPlugin = require('babel-relay-plugin');
const schema = require('../../backend/schema.json');

module.exports = getBabelRelayPlugin(schema.data);
