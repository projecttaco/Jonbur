# Klaytn 스터디 6주차 (12/17)
### 이번주 목표
- Klaystagram + Jetstream 구현
- 회고 (Retrospective)

## Klaystagram + Jetstream 구현
**실시간 데모는 https://projecttaco.github.io 에서 확인하실 수 있습니다.**
- 남이 만들어놓은 코드를 바꾼다는건 쉽지 않은 일입니다. 충분한 이해가 없으면 하나 건드렸을때 수많은 빨간색 오류들을 보게됩니다.
- 저희도 Jetstream을 추가하는 기능을 개발하면서 수많은 오류들을 거쳐왔고, 그것들을 해결해나가면서 많은걸 배웠다고 생각합니다.
- 또한, 좋은 예시 코드를 보면서 코드 패턴이나 배치등을 볼 수 있어서 다양한 경험을 할 수 있었습니다.
- 코드는 https://github.com/projecttaco/klaystagram 에서 보실 수 있습니다.

### Auth Page
- 맨 처음에 나오는 Auth page에는 버튼을 재활용해 Log in with Jetstream을 만들었습니다. 
- Jetstream의 예쁜 분홍색을 놓치지 않기위해 hover시 나오도록 하여 일반 Login버튼과의 차별화를 두었습니다.
- Jetstream이 없을 경우, 경고창이 나면서 privatekey로 로그인 하라는 메시지 기능까지 구현했습니다.

### Auth Redux
- Jetstream으로 로그인하게되면, 기존의 login이 아니라 loginJetstream이라는 함수를 만들어 호출했습니다.
- 이때, integrate wallet을 호출하지 않으므로 address값을 jet.klay.address값으로 넣어주게 됩니다.
- 그러면 Navbar에 있는 Wallet또한 자동으로 jetstream account와 synchronize되게 됩니다.

### Photos Redux
```javascript
export const uploadPhoto = (
  file,
  fileName,
  location,
  caption
) => (dispatch, getState) => {
  const { auth: { isJetstream } } = getState()
  const reader = new window.FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => {
    const buffer = Buffer.from(reader.result)
    /**
     * Add prefix `0x` to hexString
     * to recognize hexString as bytes by contract
     */
    const hexString = "0x" + buffer.toString('hex')
    if (isJetstream) {
      uploadMethodJetstream(dispatch, hexString, fileName, location, caption)
    } else {
      uplaodMethodKlay(dispatch, hexString, fileName, location, caption) 
    }
  }
}
``` 
이렇게 getState()에서 Jetstream으로 로그인했는지를 가져오고, 가져오게되면 새롭게 만든 uploadMethodJetstream을 실행하게 됩니다.

```javascript
const uploadMethodJetstream = (dispatch, hexString, fileName, location, caption) => {
  jet.klay.sendTransaction({
    to: '0x52B5ECb5b9e1fc5d0BEf7f949F074f84E9045c3b',
    data: KlaystagramContract.methods.uploadPhoto(hexString, fileName, location, caption).encodeABI(),
    gas: '200000000',
    value: 0,
  })
    .on('transactionHash', (txHash) => {
      ui.showToast({
        status: 'pending',
        message: `Sending a transaction... (uploadPhoto)`,
        txHash,
      })
    })
    .on('receipt', (receipt) => {
      const events = getContractEventsFromReceipt(KlaystagramContract, receipt);
      ui.showToast({
        status: receipt.status ? 'success' : 'fail',
        message: `Received receipt! It means your transaction is
        in klaytn block (#${receipt.blockNumber}) (uploadPhoto)`,
        link: receipt.transactionHash,
      })
      const tokenId = receipt.events.PhotoUploaded.returnValues[0]
      dispatch(updateFeed(tokenId))
    })
    .on('error', (error) => {
      console.log(error)
      ui.showToast({
        status: 'error',
        message: error.toString(),
      })
    })
}
``` 
이런식으로 원하는 컨트랙트를 가져와서 encodeABI한 후, sendTransaction을 통해 보낼 수 있습니다.
다만, on('receipt')에서 이벤트를 불러오지 못해서 새로운 tokenId를 받아올 수가 없었습니다.
이벤트를 받아오려면 다음과 같은 함수를 (Jetstream 개발자님의 도움을 받았습니다.) 사용하여 받아오면 됩니다.

```javascript
const getContractEventsFromReceipt = (contractInstance, receipt) => {
  if (!receipt) return []
  if (!receipt.logs) return []
  const events = receipt.logs.map(log => {
    return contractInstance._decodeEventABI.call({
      name: 'ALLEVENTS',
      jsonInterface: contractInstance.options.jsonInterface
    }, log)
  })
  receipt.events = {}

  let count = 0
  events.forEach((ev) => {
    if (ev.event) {
      if (receipt.events[ev.event]){
        if (Array.isArray(receipt.events[ev.event])){
          receipt.events[ev.event].push(ev)
        } else {
          receipt.events[ev.event] = [receipt.events[ev.event], ev]
        }
      } else {
        receipt.events[ev.event] = ev
      }
    } else {
      receipt.events[count] = ev
      count++
    }
  })
  return receipt.events
}
```

### TransferOwnership
이 부분도 위 코드와 비슷하게 getState()으로 Jetstream이 사용됐는지 판별하고, 리턴값에 따라 적절한 함수를 호출하게 됩니다.

### Bug Fix & Miscellaneous
- Account를 누르면 Klaytn Scope으로 이동하는 경로 설정이 깨져있었습니다. 이 부분을 바꿔서 이제는 잘 작동하게 되었습니다.
- Transfer 이후에 받아오는 함수에서 ID라고 되어있는 부분을 'ID'로 고쳐서 잘 작동하게 만들었습니다.

```javascript
const updateOwnerAddress = (tokenId, to) => (dispatch, getState) => {
  const { photos: { feed } } = getState()
  const newFeed = feed.map((photo) => {
    if (photo['ID'] !== tokenId) return photo
    photo[OWNER_HISTORY].push(to)
    return photo
  })
  dispatch(setFeed(newFeed))
}
```



## 회고 (Retrospective)
Agile에서 나온 retrospective를 차용해서 마지막 모임을 가졌습니다.
일정상 불참하신 디자이너분을 제외한 6명의 멤버가 모두 모여서 지원금으로 맛있는걸 먹고, 회고를 진행했습니다.
**이번 스터디를 지원해주신 그라운드X분들께 감사드립니다.**

### What went well? / 잘된점
- 리액트와 자바스크립트등을 공부할 수 있어서 좋았다. (4)
- 다양한 사람들을 만나봐서 좋다. (4)
- BApp을 개발하기 위해 어떤것들이 필요한지 알 수 있었다. (3)
- 내가 뭘 모르는지 알 수 있었고, 인사이트를 넓혀준다. (3)
- 아이디어를 구체화하고 시각화 할 수 있어서 좋았다.


### What needs improvement? / 개선할점
- 로드맵을 정하고 인원분배를 잘 하면 좋겠다. (중간에 파트가 바뀌는 경우가 많았음) (4)
- 모여서 일 얘기에만 너무 집중한게 아닌가 싶다. 가끔은 근황도 나누고 세상 돌아가는 얘기도 하면 좋겠다. (3)
- 자신이 생각했던 / 하고싶었던 역할을 못하고 아무것도 하지못했다. (2)
- 트러플이나 드리즐 등 환경세팅이 잘 안돼서 초기에 시간을 많이 잡아먹었다 (2) 

### Next actions
- 스터디가 끝나도 존버를 마무리해서 완성시키자
- 다른 BApp/DApp을 다른 아이디어를 가지고 더 만들어보자
- 남은 지원금으로 맛있는거 한번 더 먹자..!
