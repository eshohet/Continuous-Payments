let ContinuousPayment = artifacts.require('./ContinuousPayment.sol');

contract('ContinuousPayment', async function ([contractor, employer]) {

    let contract;

    beforeEach(async () => {
        contract = await ContinuousPayment.new(weiPerSecond, {from: contractor});
    });

    it("Fuck", async () => {

    });
});
