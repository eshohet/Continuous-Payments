let ContinuousPayment = artifacts.require('./ContinuousPayment.sol');

contract('ContinuousPayment', async ([contractor, employer]) => {

    let contract;

    beforeEach(async () => {
        contract = await ContinuousPayment.new(1, {from: contractor});
    });

    it("Test", async () => {

    });
});
