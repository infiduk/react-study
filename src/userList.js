import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b>
      <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ];

  return (
    <>
      {/* 배열 내 모든 항목에 대한 함수 호출 결과를 새로운 배열로 만들어 반환 */}
      {users.map(user => (
        // 리액트 에서 배열을 렌더링할 때는 key 라는 props 가 필요
        // key 는 각 원소마다 가지고 있는 고유한 값으로 설정해야 함
        // key 를 설정하지 않을 경우 경고 메시지가 출력 되고, 배열 업데이트가 비효율적으로 이루어짐
        <User user={user} key={user.id} />

        /*
        각 원소마다 고유한 값을 가지고 있지 않을 경우 아래와 같이 map 의 두 번째 인자인 index 를 활용

        {users.map((user, index) => {
          <User user={user} key={index} />
        */

      ))}
    </>
  )
};

export default UserList;