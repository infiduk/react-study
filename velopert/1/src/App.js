import React, { useMemo, useReducer } from 'react';
import UserList from './userList';
import CreateUser from './CreateUser';
import produce from 'immer';

/*
Context API 사용

현재 App Component 에서 onToggle, onRemove 등이 구현되어 있고
UserList Component 는 User Component 에게 전달만 함

특정 함수를 특정 Component 를 거쳐 원하는 Component 에 전달하는 작업은
중간 다리역할을 하는 Component 가 많아질 수록 비효율적임

React 의 Context API 와 dispatch 를 함께 사용하여 위의 방법보다 간단한 구조로 만들 수 있음

Context API 를 사용하면 프로젝트 안에서 전역적으로 사용할 수 있는 값 관리 가능
함수, 외부 라이브러리 인스턴스, DOM 등 다양한 값을 관리할 수 있음

Context 를 만들 때는 React.createContext() 함수를 이용
createContext 의 parameter 에는 default 값을 설정할 수 있음

Context 생성 시 Context 안에 Provider 라는 Component 가 있는데,
이 Component 의 value 를 이용해 Context 의 값을 정할 수 있음

Provider 에 의해 감싸진 Component 중 어디든지 Context 의 값을 사용할 수 있음
*/

function reducer(state, action) {
  switch (action.type) {
    // 커스텀 hooks useInputs 를 이용하기 때문에 주석 처리
    // case 'CHANGE_INPUT':
    //   return {
    //     ...state,
    //     inputs: {
    //       ...state.inputs,
    //       [action.name]: action.value
    //     }
    //   };
    case 'CREATE_USER':
      // immer 를 사용한 방법
      return produce(state, draft => {
        draft.users.push(action.user);
      });
    /*
    return {
      // 커스텀 hooks useInputs 를 이용하기 때문에 주석 처리
      // inputs: initialState.inputs,
      users: [...state.users, action.user]
      // users: state.users.concat(action.user)
    }
    */
    case 'REMOVE_USER':
      // immer 를 사용한 방법
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id);
        draft.users.splice(index, 1);
      });

    /*
    return {
      ...state,
      users: state.users.filter(user => user.id !== action.id)
    }
    */
    case 'TOGGLE_ACTIVE':
      // immer 를 사용한 방법
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      });

    /*
    return {
      ...state,
      users: state.users.map(user =>
        user.id === action.id ? { ...user, active: !user.action } : user
      )
    }
    */
    default:
      return state;
  }
}

function countActiveUsers(users) {
  return users.filter(user => user.active).length;
}

const initialState = {
  users: [
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
  ]
};

// Context 생성 후 export 하여 어디서든지 사용할 수 있게 함
export const UserDispatch = React.createContext();

function App() {
  /*
  Component 에서 관리하는 값이 하나고 값이 단순한 숫자이거나 문자열, boolean 이라면 useState 로 관리하는 것이 좋음
  const [value, state] = useState(true);

  Component 에서 관리하는 값이 여러개로, 상태의 구조가 복잡해진다면 useReducer 로 관리하는 것이 좋음

  useReducer 를 사용할 경우 dispatch 를 Context API 로 전역적인 사용이 가능하도록 구현할 수 있음
  깊은 곳에 위치하는 Component 에게 함수를 전달해야 한다면, Context API 를 사용하면 좋음
  */

  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);

  // Context API 사용을 위해 주석 처리
  // const onToggle = useCallback(
  //   id => {
  //     dispatch({
  //       type: 'TOGGLE_ACTIVE',
  //       id
  //     });
  //   }, []);

  // const onRemove = useCallback(
  //   id => {
  //     dispatch({
  //       type: 'REMOVE_USER',
  //       id
  //     });
  //   }, []);

  /*
  커스텀 hooks useInputs 를 이용하기 때문에 주석 처리

  const onChange = useCallback(
    e => {
      const { name, value } = e.target;
      dispatch({
        type: 'CHANGE_INPUT',
        name,
        value
      });
    }, []);
  */

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList
        users={users}
      // Context API 사용을 위해 주석 처리
      // onToggle={onToggle}
      // onRemove={onRemove} />
      />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;