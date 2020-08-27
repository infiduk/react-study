import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './inputSample';
import UserList from './userList';

import './App.css';

function App() {
  const name = "이름"
  // 파일 내에서 style 정의
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  }
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
    <UserList />
    </>
  );
}

export default App;
