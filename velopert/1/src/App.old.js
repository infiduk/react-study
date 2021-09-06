import React, { useState, useRef, useMemo, useCallback } from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './inputSample';
import CreateUser from './CreateUser';
import UserList from './userList';

import './App.css';

/*
기본적으로 React Component 는 부모 Component 가 리렌더링 되면 자식 Component 도 리렌더링 됨
실제 DOM 에 변화가 반영되는 것은 바뀐 내용이 있는 Component 에만 해당 되지만, Virtual DOM 에는 모든 게 다 렌더링 됨
*/

/*
useCallback, useMemo, React.memo 는 확실히 Component 의 성능을 개선할 수 있을 때만 사용하는 게 좋음
*/

// active 상태인 user 의 수를 세어서 return 하는 함수
function countActiveUsers(users) {
  return users.filter(user => user.active).length;
}

function App() {
  // CreateUser 를 위한 state
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;

  // users 배열
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]);

  const name = "이름"
  // 파일 내에서 style 정의
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    // 기본 단위 px
    fontSize: 24,
    // 다른 단위 사용 시 문자열로 설정
    padding: '1rem'
  }

  /* 
  Component 에서 특정 DOM 을 선택해야 할 때, ref 를 사용
  함수형 Component 에서는 useRef 를 사용하여 설정

  useRef Hook 은 DOM 선택 이외에, Component 안에서 조회 및 수정할 수 있는 변수를 관리
  useRef 로 관리하는 변수는 값이 바뀐다고 해서 Component 가 리렌더링 되지 않음 (값 변경 및 설정 후 바로 조회 가능)

  useRef 로 관리할 수 있는 값
  - setTimeout, setInterval 등을 통해 만들어진 id
  - 외부 라이브러리를 사용하여 생성된 인스턴스
  - scroll 위치
  - 배열의 id
  */

  // useRef 안에 paratemer 를 넣어주면, .current 의 기본 값이 됨
  const nextId = useRef(4);

  /*
  useCallback 은 특정 함수를 새로 만들지 않고 재사용할 때 사용
  Component 가 리렌더링될 때 마다 함수도 새로 만들어짐

  매번 함수를 선언하는 것 자체는 많은 리소스를 차지하는 작업은 아니지만, 재사용성이 떨어지기 때문에 필요할 때만 함수를 선언하고 재사용 하는 것이 중요하다고 볼 수 있음

  useCallback 을 사용할 때, 함수 안에서 사용하는 props 나 state 가 있다면 반드시 deps 배열에 포함시켜야 함
  
  deps 배열에 함수에서 사용하는 값을 넣지 않으면 함수 내에서 해당 값들을 참조할 때 최신 값을 참조한다는 보장이 없음
  props 로 함수를 받아왔을 경우, 해당 함수를 deps 배열에 넣어줘야 함
  */

  // 배열을 저장할 때 호출하는 함수
  const onCreate = useCallback(
    () => {
      const user = {
        // .current 로 현재 값을 불러올 수 있음
        id: nextId.current,
        username,
        email
      };
      // spread 연산자를 이용해 배열 update
      setUsers(users => [...users, user]);

      // 함수형 업데이트 하기 전
      // setUsers([...users, user]);

      /*
      concat 함수를 이용해 배열 update
      concat 함수는 기존의 배열을 수정하지 않고, 새로운 원소가 추가된 배열을 만들어 줌
  
      setUsers(users.concat(user));
      */

      // User 를 생성했으므로 input 에 있는 값을 초기화 시킴
      setInputs({
        username: '',
        email: ''
      });

      nextId.current += 1;
      // users 와 inputs 가 필요, username 과 email 은 따로 뺌
    }, [username, email]);

  // 값이 변경될 때 호출되는 함수
  const onChange = useCallback(
    e => {
      // 값이 변경되면 input 값을 가져와서 input 을 다시 뿌려줌
      const { name, value } = e.target;
      setInputs(inputs => ({
        ...inputs,
        [name]: value
      }));
    }, []);

  const onToggle = useCallback(
    id => {
      setUsers(users => (
        users.map(user => (
          user.id === id ? { ...user, active: !user.active } : user
        ))
      ));
    }, []);

  // parameter 로 가져온 id 와 다른 id 들로 이루어진 배열을 만들어서 setUsers
  const onRemove = useCallback(
    id => {
      setUsers(users => users.filter(user => user.id !== id));
    }, []);

  // 현재 users 배열에 있는 원소 중, active: true 인 원소만 찾아서 count 에 저장
  const count = useMemo(() => countActiveUsers(users), [users]);

  /*
  useCallback 을 사용한 함수를 useMemo 를 사용한 형태로 나타낼 수 있음

  useCallback(fn, deps);
  const onRemove = useCallback(
    id => {
      setUsers(users.filter(user => user.id !== id));
    }, [users]);

  useMemo(() => fn, deps);
  const onRemove = useMemo(
    () =>
      id => {
        setUsers(users.filter(user => user.id !== id));
      }, [users]);
  */

  /*
  useMemo 는 특정 값을 재사용할 때 사용

  useMemo 를 사용하지 않을 경우, Component 가 리렌더링될 때 (input 값이 변경 되었을 때 등) 불필요한 상황에도 무조건 호출되므로 자원을 낭비한다고 볼 수 있음
  
  const count = countActiveUsers(users);

  useMemo 라는 Hook 함수를 사용해 성능을 최적화 시킬 수 있음
  Memo 란 memoized 로, 이전에 계산 한 값을 재사용한다는 의미를 가지고 있음

  useMemo 의 첫번째 parameter 는 어떻게 연산할 지 정의하는 함수를 넣음
  두번째 parameter 에는 deps 배열을 넣음
  
  deps 배열의 내용이 바뀔 때는 첫번째 parameter 의 함수를 호출해서 값을 연산하고, 내용이 바뀌지 않았을 경우 이전에 연산한 값을 재사용함
  */

  return (
    <>
      {/* 여러 개의 Component 를 띄우려면, <div> 로 감싸거나 <>(Fragment) 로 감싸주어야 함 */}
      <Counter />
      <Wrapper>
        {/* Component 안에 자식 Component 넣기 */}
        <Hello value="pink" />
        <Hello value="yellow" />
      </Wrapper>
      <Hello />
      {/* bool 타입의 props 를 넘길 때, 값을 지정하지 않으면 true 가 넘어감 */}
      <Hello value="red" isSpecial />
      <div style={style}>React</div>
      {/* CSS Class 를 설정할 때 class 가 아닌 className 으로 줘야 함 */}
      <div className="gray-box">{name}</div>
      <InputSample />
      {/* User 생성 Component */}
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate} />
      {/* UserList 띄우는 Component */}
      <UserList
        users={users}
        onRemove={onRemove}
        onToggle={onToggle} />
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;
