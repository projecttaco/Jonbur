pragma solidity ^0.5.0;

contract Jonbur{
    struct Hodl{
        uint date;
        string comment;
        uint amount;
        bool spent;
        address hodlOwner;
    }

    address public owner;
    uint public hodlIndex;
    mapping(uint => Hodl) hodls;
    mapping(address => uint[]) hodlers;
    
    event HodlerAdded(address _addr, string _comment);
    event HodlerRewarded(address _addr);
    
    constructor() public{
        owner = msg.sender;
        hodlIndex = 0;
    }
    
    function getHodlIndexes() view public returns (uint[] memory){
        return hodlers[msg.sender];
    }
    
    function getHodl(uint _index) view public returns (uint , uint, bool){
        return (hodls[_index].date, hodls[_index].amount, hodls[_index].spent);
    }
    
    function getComment(uint _index) view public returns (string memory){
        return hodls[_index].comment;
    }
    
    function deposit(uint _date, string memory _comment) public payable {
        hodlers[msg.sender].push(hodlIndex);
        hodls[hodlIndex] = Hodl(_date, _comment, msg.value, false, msg.sender);
        hodlIndex++;
        emit HodlerAdded(msg.sender, _comment);
    }
    
    function withdraw(uint _index) public {
        require(hodls[_index].hodlOwner == msg.sender, "Invalid Jonbur");
        require(hodls[_index].spent == false, "Already Rewarded");
        require(hodls[_index].date <= block.timestamp, "Not yet");
        msg.sender.transfer(hodls[_index].amount);
        emit HodlerRewarded(msg.sender);
        hodls[_index].spent = true;
    }
}
