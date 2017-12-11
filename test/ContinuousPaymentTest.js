let ContinuousPayment = artifacts.require('./ContinuousPaymentMock.sol')

contract('ContinuousPayment', async ([contractor, employer]) => {
  let contract
  const weiPerSecond = web3.toWei(1, 'wei')

  beforeEach(async () => {
    contract = await ContinuousPayment.new(weiPerSecond, { from: contractor })
    contract.depositPayment({
      from: employer,
      value: web3.toWei(10, 'wei')
    })
  })

  it('Drain contract by contractor after expiration of contract', async () => {
    await contract.setTime((await contract.startTime()) + 11)
    await contract.withdrawPayment({
      from: contractor,
    })
    assert.equal((await web3.eth.getBalance(contract.address)), 0, "Contract should not have a balance")

  })
})

