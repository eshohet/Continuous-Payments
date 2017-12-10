let ContinuousPayment = artifacts.require('./ContinuousPaymentMock.sol')

contract('ContinuousPayment', async ([contractor, employer]) => {
  let contract

  beforeEach(async () => {
    contract = await ContinuousPayment.new(web3.toWei(0.01, 'ether'), { from: contractor })
    contract.depositPayment({
      from: employer,
      value: web3.toWei(1, 'ether')
    })
  })

  it('Test', async () => {
    const initialBalance = await web3.eth.getBalance(contractor)
    await contract.withdrawPayment({
      from: contractor
    })
    const balance = await web3.eth.getBalance(contractor)
    assert.equal(balance.greaterThan(initialBalance), true, 'Final balance should be greater than initial balance')
  })
})

