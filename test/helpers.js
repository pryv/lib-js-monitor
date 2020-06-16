/**
 * Loaded by .mocharc.js for node tests
 */
const chai = require('chai'); 
const Pryv = require('pryv');
require('../src')(Pryv); // Loading Monitor on Pryv
const testData = require('../node_modules/pryv/test/test-data.js');
global.chai = chai;
global.Pryv = Pryv;
global.testData = testData; 
global.should = chai.should();
global.expect = chai.expect;

global.apiEndpoint = apiEndpoint = testData.pryvApiEndPoints[0];
global.conn = conn = new Pryv.Connection(testData.pryvApiEndPoints[0]);
global.testStreamId = testStreamId = 'monitor-test';


global.createBaseStreams = async () => {
  const res = await conn.api([{
    method: 'streams.create',
    params: {
      id: testStreamId,
      name: testStreamId
    }
  }]);
  expect(res[0]).to.exist;
  if (res[0].stream) return;
  expect(res[0].error).to.exist;
  expect(res[0].error.id).to.equal('item-already-exists');
}
