pragma solidity ^0.4.15;

contract ContinuousPayment {

    address public contractor;
    address public employer;
    uint public weiPerSecond;
    uint public startTime;
    uint public time;

    function ContinuousPayment(uint _weiPerSecond) {
        weiPerSecond = _weiPerSecond;
        contractor = msg.sender;
    }

    function () payable {
        depositPayment();
    }

    function depositPayment () payable {
        employer = msg.sender;
        startTime = now;
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
        return weiPerSecond * (now - startTime);
    }

    function getTime() constant returns (uint) {
        return time;
    }



}