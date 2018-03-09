# Continuous Payments
## Overview
Continuous payments is a smart contract that allows for an employee's
wages to be vested with no cliff period.

Each second the amount that can be withdrawn by an employee increases.

At any time the employer can cancel the contract by withdrawing
the remaining balance.

## Testing
```bash
testrpc
truffle test
```