/*global
  Pryv, chai, should, testData, conn, apiEndpoint, creaBaseStreams
*/


describe('Monitor + Socket.io', function () {
  this.timeout(3000);

  before(async () => {
    await createBaseStreams();
  });

  describe('init', () => {
    it('can be initialized with socket method', async () => {
      const monitor = new Pryv.Monitor(apiEndpoint, { limit: 1 }, {method: 'socket.io'});
      await monitor.start();

    });
  });

});
