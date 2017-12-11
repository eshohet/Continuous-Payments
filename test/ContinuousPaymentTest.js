let ContinuousPayment = artifacts.require('./ContinuousPaymentMock.sol')

contract('ContinuousPayment', async ([contractor, employer]) => {
  let contract
  const weiPerSecond = 1;

  beforeEach(async () => {
    contract = await ContinuousPayment.new(weiPerSecond, { from: contractor })
    contract.depositPayment({
      from: employer,
      value: web3.toWei(1, 'ether')
    })
  })

  it('Test', async () => {
    const initialBalance = await web3.eth.getBalance(contractor)
    await contract.setTime(await contract.startTime() + 5)
    const txHash = (await contract.withdrawPayment({ 
      from: contractor
    })).tx;
    const finalBalance = await web3.eth.getBalance(contractor)
    const txnDetails = await web3.eth.getTransaction(txHash)
    const ethUsed = web3.toBigNumber(txnDetails.gas).times(txnDetails.gasPrice)
    const expectedBalance = web3.toBigNumber(web3.toBigNumber(weiPerSecond * 5).plus(initialBalance)).minus(ethUsed)
    console.log((expectedBalance.sub(finalBalance)).toNumber())

    assert.equal(expectedBalance.equals(finalBalance), true, 'Final balance should be greater than initial balance')
  })
})

