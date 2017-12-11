let ContinuousPayment = artifacts.require('./ContinuousPaymentMock.sol')

contract('ContinuousPayment', async ([contractor, employer, controller]) => {
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
    await contract.setTime((await contract.startTime()) + 11, {
      from: controller
    })
    await contract.withdrawPayment({
      from: contractor
    })
    assert.equal((await web3.eth.getBalance(contract.address)), 0, 'Contract should not have a balance')
  })

  it('Drain contract by employer after expiration of contract', async () => {
    await contract.setTime(await contract.startTime(), {
      from: controller
    })
    await contract.withdrawPayment({
      from: employer
    })
    assert.equal((await web3.eth.getBalance(contract.address)).toNumber(), 0, 'Contract should not have a balance')
  })

  it('Withdraw in the middle of the contract by the contractor', async () => {
    await contract.setTime((await contract.startTime()) + 5, {
      from: controller
    })
    const txnHash = (await contract.withdrawPayment({
      from: contractor
    })).tx
    const valueSent = web3.toBigNumber(((await web3.eth.getTransactionReceipt(txnHash)).logs)[0].data)
    assert.equal(valueSent.equals(5), true, "Partial withdrawal sent the incorrect amount")
  })

  it('Withdraw in the middle of the contract by the employer', async () => {
    await contract.setTime((await contract.startTime()) + 5, {
      from: controller
    })
    const txnHash = (await contract.withdrawPayment({
      from: employer
    })).tx
    const valueSent = web3.toBigNumber(((await web3.eth.getTransactionReceipt(txnHash)).logs)[0].data)
    assert.equal(valueSent.equals(5), true, "Partial withdrawal sent the incorrect amount")
  })

  it('Tests whether or not startTime is set when a withdrawal occurs', async () => {
    const startingTime = await contract.startTime()
    await contract.setTime((await contract.startTime()) + 1, {
      from: controller
    })
    await contract.withdrawPayment({
      from: contractor
    })
    const endingTime = await contract.startTime()
    assert.equal(startingTime.plus(1).equals(endingTime), true, "startTime has not changed")
  })

})

