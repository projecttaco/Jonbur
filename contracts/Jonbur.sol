pragma solidity ^0.5.0;

contract Jonbur{
    struct Hodl{
        uint date;
        string comment;
        uint amount;
    }
    
    address public owner;
    mapping(address => Hodl) hodlers;
    
    event HodlerAdded(address _addr, string _comment);
    event HodlerRewarded(address _addr);
    
    constructor() public{
        owner = msg.sender;
    }
    
    function getMyAmount() view public returns (uint){
        return hodlers[msg.sender].amount;
    }

    function getComment(address _addr) view public returns (string memory) {
        return hodlers[_addr].comment;
    }
    
    function getMyComment() view public returns (string memory) {
        return hodlers[msg.sender].comment;
    }
    
    function deposit(uint _date, string memory _comment) public payable {
        require(hodlers[msg.sender].amount == 0, "Already has a Jonbur");
        hodlers[msg.sender] = Hodl(_date, _comment, msg.value);
        emit HodlerAdded(msg.sender, _comment);
    }
    
    function withdraw() public {
        require(hodlers[msg.sender].date > 0, "Don't have a Jonbur");
        require(hodlers[msg.sender].date <= block.timestamp, "Not yet");
        msg.sender.transfer(hodlers[msg.sender].amount);
        emit HodlerRewarded(msg.sender);
        hodlers[msg.sender].amount = 0;
        hodlers[msg.sender].comment = "";
    }
}