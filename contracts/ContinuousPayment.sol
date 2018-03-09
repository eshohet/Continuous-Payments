pragma solidity ^0.4.15;

//TODO: Allow the contract to be reused

contract ContinuousPayment {

    address public contractor;
    address public employer;
    uint public weiPerSecond;
    uint public startTime;

    event Withdrew(uint amount, address indexed withdrawer);

    function ContinuousPayment(uint _weiPerSecond) {
        weiPerSecond = _weiPerSecond;
        contractor = msg.sender;
    }

    function() payable {
        depositPayment();
    }

    function depositPayment() payable {
        require(employer == 0x0); //don't allow this to be set twice
        employer = msg.sender;
        startTime = getTime();
    }

    function withdrawPayment() {
        uint owed = balanceOwed();
        startTime = getTime();
        if (contractor == msg.sender) {
            require(owed > 0);
            contractor.transfer(owed);
            Withdrew(owed, msg.sender);
        }
        if (employer == msg.sender) {
            uint employerOwed = address(this).balance - owed;
            require(employerOwed > 0);
            employer.transfer(employerOwed);
            Withdrew(employerOwed, msg.sender);
        }
    }

    function balanceOwed() constant returns (uint) {
        uint owed = weiPerSecond * (getTime() - startTime);
        uint balance = address(this).balance;
        if (owed > balance) {
            owed = balance;
        }
        return owed;
    }

    //overridden in test files
    function getTime() constant returns (uint) {
        return now;
    }
}