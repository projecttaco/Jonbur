# Klaytn 스터디 4주차 (12/3)
### 이번주 목표
	- Drizzle에 Caver 이식 시키기
	- 스토리보드 프로토타이핑
	- 시안 공유

## Drizzle 구성
프로젝트 처음 계획부터 Truffle Suite (Truffle, Ganache, Drizzle)을 사용해서 BApp을 만들고자 했습니다.

Drizzle은 Ethereum에서 DApp을 만들때 유용하게 쓸 수 있는 React Framework입니다. React와 Redux, 그리고 Redux Saga까지 사용하는 Drizzle은 배우기가 어렵습니다. 하지만 Drizzle을 사용한다면 cacheCall과 cacheSend등 강력한 block event listening 기능을 쉽게 적용할 수 있기 때문에 사용하기로 결정했습니다.

이번 스터디에서는 아직 아무도 시도하지 않은 Drizzle에 Caver를 포팅해보기로 합니다.

## 와이어프레임 
![storyboard_card](https://github.com/projecttaco/Jonbur/raw/master/docs/klaytn_study/images/storyboard_card.jpg)
우선 와이어프레임 단계에서 의도하지 않은 각 화면의 디자인에 대한 평가가 이루어지는 것을 방지하고자 했습니다.
처음에는 손 스케치를 시도했는데, 반복되는 작업량이 많아져서 Balsamiq을 이용해 손으로 그린 것 같은 정도의 low fidelity 와이어프레임을 완성했고,
실제로도 와이어프레임을 리뷰하는 팀원들의 디자인에 대한 선입견을 어느 정도 배제할 수 있었던 것 같습니다.
와이어프레임을 화면 단위로 따로 출력 후 직접 배치하면서 서비스가 진행되는 과정과, 각 단계에서 어떤 화면이 이어져 나오는지 등에 집중했습니다.
팀원 모두가 본 리뷰에 참여했고, 서비스의 전체 플로우를 와이어프레임을 통해 따라가 보면서 다양한 피드백을 받을 수 있었습니다.

[피드백]

 - 보관 희망하는 암호화폐 수량 입력 시 암호화폐 단위 / USD 단위 중 선택해서 입력 가능하면 좋을 듯
 - 지갑 프로그램에서 최종 컨펌이 있기는 하지만, 자체적으로 컨펌 단계 추가 필요 (보관 금액, 보관 기간, Withdraw 가능 일자 등을 다시 한 번 확인)
 - 지갑 미연결 상태에서 별도 화면 대신 대시보드와 동일한 백그라운드 화면을 출력하는 것 (암호화폐 수량 현황, 보관 내역 등 제외) -> 랜딩 페이지 또는 간략한 화면 소개 역할도 겸하면서, 지갑 연결 안내 목적도 달성할 수 있도록
 - 대시보드에서 현재 연결된 지갑 내 ETH를 메인으로 보여주는데, 1) 전체 암호화폐 (지갑 내 암호화폐 + 보관한 총 암호화폐), 2) 보관한 총 암호화폐, 3) 현재 연결된 지갑 내 암호화폐 (즉, 가용 암호화폐) 정보를 모두 사용자에게 제공 (결국에는 보관한 암호화폐도 사용자의 자산이라는 느낌을 받을 수 있도록 + 사용자들이 본인 소유의 암호화폐를 분리 보관한다는 느낌을 받도록)
 - 최소 1년 이상의 장기 보관을 희망하는 경우가 대다수일 것 같음. 날짜 선택 시 캘린더 형태의 화면보다는 yyyy/mm/dd 형태의 date picker 키보드를 활용하는 것이 더 좋을 것 같음 (+ 추가로 hh:mm:ss 도 입력 가능하도록 하여, 사용자들이 테스트를 해볼 수 있도록)

![스토리보드](https://github.com/projecttaco/Jonbur/raw/master/docs/klaytn_study/images/Jonbur%20v2.png)

## 디자인 시안 공유
![sample1](https://github.com/projecttaco/Jonbur/raw/master/docs/klaytn_study/images/sample1.png)
![sample2](https://github.com/projecttaco/Jonbur/raw/master/docs/klaytn_study/images/sample2.png)
![sample3](https://github.com/projecttaco/Jonbur/raw/master/docs/klaytn_study/images/sample3.png)
![sample4](https://github.com/projecttaco/Jonbur/raw/master/docs/klaytn_study/images/sample4.png)

