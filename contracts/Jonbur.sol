pragma solidity ^0.5.0;

contract Jonbur{
    struct Hodl{
        uint dueDate;
        uint depositAmount;
        uint depositDate;
        uint withdrawDate;
        uint depositPrice;
        uint withdrawPrice;
        bool spent;
        string comment;
        address owner;
    }
    address public owner;
    uint public lastIndex;
    mapping(uint => Hodl) hodls;
    mapping(address => uint[]) index;
    mapping(address => uint) sum;

    event NewHodl(address _addr, string _comment);
    event DoneHodl(address _addr);
    
    constructor() public{
        owner = msg.sender;
    }
    
    function getHodlIndex() public view returns (uint[] memory){
        return index[msg.sender];
    }
    
    function getHodl(uint _index) public view returns (uint, uint, uint, uint, uint, uint, bool){
        Hodl storage h = hodls[_index];
        return (h.dueDate, h.depositAmount, h.depositDate, h.withdrawDate, h.depositPrice, h.withdrawPrice, h.spent);
    }
    
    function getComment(uint _index) public view returns (string memory){
        return hodls[_index].comment;
    }

    function getSum() public view returns (uint) {
        return sum[msg.sender];
    }
    function deposit(uint _dueDate, uint _depositPrice, string memory _comment) public payable {
        index[msg.sender].push(lastIndex);
        hodls[lastIndex] = Hodl(_dueDate, msg.value, block.timestamp,  0,  _depositPrice, 0, false, _comment, msg.sender);
        lastIndex++;
        sum[msg.sender] += msg.value;
        emit NewHodl(msg.sender, _comment);
    }
    function withdraw(uint _index, uint _withdrawPrice) public {
        require(hodls[_index].owner == msg.sender, "Invalid owner");
        require(hodls[_index].spent == false, "Withdrew Already");
        require(hodls[_index].dueDate <= block.timestamp, "Not yet");
        msg.sender.transfer(hodls[_index].depositAmount);
        hodls[_index].withdrawDate = block.timestamp;
        hodls[_index].spent = true;
        hodls[_index].withdrawPrice = _withdrawPrice;
        sum[msg.sender] -= hodls[_index].depositAmount;
        emit DoneHodl(msg.sender);
    }
}