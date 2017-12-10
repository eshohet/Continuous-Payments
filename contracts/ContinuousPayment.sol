pragma solidity ^0.4.15;

contract ContinuousPayment {

    address public contractor;
    address public employer;
    uint public weiPerSecond;
    uint public startTime;

    function ContinuousPayment(uint _weiPerSecond) {
        weiPerSecond = _weiPerSecond;
        contractor = msg.sender;
    }

    function () payable {
        depositPayment();
    }

    function depositPayment () payable {
        employer = msg.sender;
        startTime = getTime();
    }

    function withdrawPayment() {
        uint owed = balanceOwed();
        startTime = getTime();
        if (contractor == msg.sender) {
            contractor.transfer(owed);
        }
        if (employer == msg.sender) {
            uint employerOwed = address(this).balance - owed;
            employer.transfer(employerOwed);
        }
    }

    function balanceOwed() constant returns(uint) {
        return weiPerSecond * (getTime() - startTime);
    }

    function getTime() constant returns (uint) {
        return now;
    }



}