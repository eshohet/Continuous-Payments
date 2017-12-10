let ContinuousPayment = artifacts.require('./ContinuousPayment.sol');

contract('ContinuousPayment', async ([contractor, employer]) => {

    let contract;

    beforeEach(async () => {
        contract = await ContinuousPayment.new(1, {from: contractor});
        contract.depositPayment({
            from: employer,
            value: 3000
        }); 
    });

    it("Test", async () => {

    });
});
