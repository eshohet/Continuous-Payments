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
      from: contractor,
    })
    assert.equal((await web3.eth.getBalance(contract.address)), 0, "Contract should not have a balance")
  })
  
  it('Drain contract by employer after expiration of contract', async () => {
    await contract.setTime(await contract.startTime(), {
        from: controller
    })
    await contract.withdrawPayment({
      from: employer,
    })
    assert.equal((await web3.eth.getBalance(contract.address)), 0, "Contract should not have a balance")
  })

  it('Withdraw in the middle of the contract by the contractor', async () => {
    await contract.setTime((await contract.startTime()) + 5, {
        from: controller,
        gasPrice: 1
    })
    const txHash = (await contract.withdrawPayment({
      from: contractor,
    })).tx
    const ethUsed = (await web3.eth.getTransactionReceipt(txHash)).gasUsed

    assert.equal((await web3.eth.getBalance(contract.address)), 0, "Contract should not have a balance")
  })


})

