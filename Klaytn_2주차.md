# Klaytn 스터디 2주차 (11/12)

## 이번주 목표
- 개발 필요 환경 설정
- Low-fidelity Prototyping 및 화면 설계
- SmartContract 설계

## 개발 필요 환경 설정
### 공통
- Notion으로 kanban board 활용 
- Github으로 버전관리

### 개발
- Visual Studio Code
- Node.js 10.x
- Python 2.7
- Truffle
- Drizzle

### 디자인
- Sketch
- Zeplin

## 앱 메뉴구성 (기획/)
앱이 최소한의 기능을 하는데 필요한 페이지는 총 4개입니다.

1. Sign-in
2. Deposit
3. Countdown
4. Withdraw

**Sign-in**

- 앱 설명 / Welcome message 등
- Deposit 페이지로 이동
    - 'Continue with Jetstream' : 클레이튼 지갑과 연동(Metamask 류의 크롬 확장프로그램 기반 지갑 연동, Klaytn의 경우 유사 서비스로 jetstream이 있음) 후 Deposit 진입
- Countdown 또는 Withdraw 페이지로 이동
    - 'Continue with Jetstream' : 지갑 당 1회만 keep 가능하도록 정책을 정할 경우, Deposit이 불가능하므로 이전 정보를 참고해 Countdown 또는 Withdraw 진입
    - 직접 입력 : 스마트 컨트랙트 주소 / (이미 keep이 이루어진) 지갑 주소 입력 시 Countdown 또는 Withdraw 진입

**Deposit**

- 보관할 Klaytn의 수량 입력
- Klaytn을 보관하고자 하는 기간 입력
- 입력한 금액 / 기간 정보 확인

    + 스마트 컨트랙트에 남기고 싶은 Comment 입력

- 최종 거래 체결은 연동된 지갑 프로그램에서

**Countdown**

- 남은 시간 표시 : Day/Hour/Minute/Second
- 사용자가 남긴 Comment

**Withdraw**

- 보관 기간이 만료된 Klaytn 회수(재입금)

## SmartContract 구성 (개발)

BApp에 필요한 SmartContract를 구성해보도록 하겠습니다.

우선, SmartContract에서 필요한 요소들을 생각해보겠습니다.

첫번째로 BApp 사용자 정보(시간, 커맨트, 클레이양)를 담을 구조체가 필요합니다.
```
    struct Hodl{
    	uint date;
    	string comment;
    	uint amount;
    }
```

다음으로, 클레이튼 지갑주소와 구조체를 매핑할 변수 hodlers와 owner를 선언하고

BApp 사용자가 추가되거나 보상을 받게되면 알려줄 event도 선언합니다.
```
    address public owner;
    mapping(address => Hodl) hodlers;
        
    event HodlerAdded(address _addr, string _comment);
    event HodlerRewarded(address _addr);
```
BApp의 SmartContract에서 필수적으로 구현되어야 할 함수는 Deposit과 Withdraw입니다.

Deposit의 경우 유저가 이미 걸어놓은 클레이가 있는지 확인하고

없다면 각 정보들을 hodlers에 담아 둡니다.
```
    function deposit(uint _date, string memory _comment) public payable {
    	require(hodlers[msg.sender].amount == 0, "Already has a Jonbur");
    	hodlers[msg.sender] = Hodl(_date, _comment, msg.value);
    	emit HodlerAdded(msg.sender, _comment);
    }
```
Withdraw의 경우 등록한 클레이가 있는지 확인하고 현재시점(블록이 생성되는 시간, block.timestamp)과 비교하여 마감시간이 지났는지 확인합니다.

모든 조건을 충족한다면 컨트랙트에서 해당하는 클레이만큼 전송하고 전송받은 주소의 hodler값을 초기화 합니다.
```
    function withdraw() public {
    require(hodlers[msg.sender].date > 0, "Don't have a Jonbur");
    require(hodlers[msg.sender].date <= block.timestamp, "Not yet");
    msg.sender.transfer(hodlers[msg.sender].amount);
    emit HodlerRewarded(msg.sender);
    hodlers[msg.sender].amount = 0;
    hodlers[msg.sender].comment = "";
    }
```
추가적인 함수로서 사용자의 커맨트를 볼 수 있는 함수를 작성해봤습니다.
```
    function getComment(address _addr) view public returns (string memory) {
    	return hodlers[_addr].comment;
    }
        
    function getMyComment() view public returns (string memory) {
    	return hodlers[msg.sender].comment;
    }
```
위의 내용들을 모두 종합하면 다음과 같습니다.
```
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
```
