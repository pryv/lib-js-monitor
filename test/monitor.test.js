/*global 
  Pryv, chai, should, testData 
*/

const apiEndpoint = testData.pryvApiEndPoints[0];
const conn = new Pryv.Connection(testData.pryvApiEndPoints[0]);

describe('Monitor', () => {


  describe('init', () => {
    it('can be initialized with an apiEndpoint', async () => {
      console.log(apiEndpoint);
      const monitor = new Pryv.Monitor(apiEndpoint, { limit: 1 });
      await monitor.start();
    });

    it('can be initialized with a connection', async () => {
      const monitor = new Pryv.Monitor(conn, { limit: 1 });
      await monitor.start();
    });

    it('throw Error on invalid apiEndpoint', async () => {
      const passed = true;
      try {
        const monitor = new Pryv.Monitor('BlipBlop', { limit: 1 });
        passed = false;
      } catch(e) {

      }
      expect(passed).to.equal(true);
    });

  });

  describe('notifications', () => {
    let monitor = null;
    beforeEach(async () => {
      monitor = new Pryv.Monitor(conn, { limit: 20 });
    });

    afterEach(async () => {
      monitor.stop()
    });

    it('Load events at start', async () => {
      let count = 0;
      monitor.on('event', function (event) {
        count++;
      });
      await monitor.start();
      await new Promise(r => setTimeout(r, 1000));
      expect(count).to.be.gt(1);
    });


  });
});
