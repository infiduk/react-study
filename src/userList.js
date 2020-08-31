import React, { useEffect } from 'react';

// Component 의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 Component 의 성능을 최적화 할 수 있는 React.memo 사용
const User = React.memo(function User({ user, onRemove, onToggle }) {
  const style = {
    cursor: 'pointer',
    color: user.active ? 'green' : 'black'
  }

  /*
  useEffect 의 첫번째 parameter 에는 함수, 두번째 parameter 에는 의존 값이 들어있는 배열 (deps) 를 넣어줌
  useEffect 에서 반환하는 함수는 cleanup 함수

  deps 배열이 비워져있으면 Component 가 나타날 때 처음 호출 됨
  deps 배열이 비워져있지 않으면 Component 가 처음 마운트 될 때, 지정한 값이 바뀔 때, 언마운트 될 때, 값이 바뀌기 전에 호출 됨

  useEffect 에서 사용하는 상태가 있다면 deps 배열에 넣어줘야 함
  deps 배열에 넣지 않으면 useEffect 가 실행될 때 최신 props/state 상태를 가르키지 않게 됨

  useEffect 의 두번째 parameter, deps 배열을 생략한다면 Component 가 리렌더링될 때 마다 호출됨

  Component 마운트 시 하는 작업
  - props 로 받은 값을 Component 의 local 상태로 설정
  - 외부 API 요청 (REST API 등 ...)
  - 라이브러리 사용 (D3, Video.js 등 ...)
  - setInterval 을 통한 작업, setTimeout 을 통한 작업 예약

  Component 언마운트 시 하는 작업
  - setInterval, setTimeout 을 사용하여 등록한 작업 clear
  - 라이브러리 인스턴스 제거
  */

  // 이 소스에서 보면 user 배열을 사용하는데, deps 에 user 배열을 넣어주지 않으면 초기 값으로 계속 return
  useEffect(() => {
    console.log("컴포넌트가 화면에 나타남");
    return () => {
      console.log("컴포넌트가 화면에서 사라짐");
    };
  }, []);

  return (
    <div>
      <b
        onClick={() => onToggle(user.id)}
        style={style}
      >{user.username}</b>
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
});

function UserList({ users, onRemove, onToggle }) {
  return (
    <>
      {/* 배열 내 모든 항목에 대한 함수 호출 결과를 새로운 배열로 만들어 반환 */}
      {users.map(user => (
        // 리액트 에서 배열을 렌더링할 때는 key 라는 props 가 필요
        // key 는 각 원소마다 가지고 있는 고유한 값으로 설정해야 함
        // key 를 설정하지 않을 경우 경고 메시지가 출력 되고, 배열 업데이트가 비효율적으로 이루어짐
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle} />

        /*
        각 원소마다 고유한 값을 가지고 있지 않을 경우 아래와 같이 map 의 두 번째 인자인 index 를 활용

        {users.map((user, index) => {
          <User user={user} key={index} />
        */

      ))}
    </>
  )
};

export default React.memo(UserList);