import React, { useState, useReducer } from 'react';

/*
Component 의 상태를 관리하는 방법은 useState, useReducer 등이 있음
useReducer 를 사용하여 상태 업데이트 로직을 Component 에서 분리시킬 수 있음

reducer 란 현재 상태와 Action 객체를 parameter 로 받아와서 새로운 상태를 반환

function reducer(state, action) {
    const nextState = ...;
    return nextState;
}

Action 이란 업데이트를 위한 정보를 가지고 있음
기본적으로 type 을 가지고 있는 자유로운 형태의 객체

{
    type: 'ADD_TODO',
    todo: {
        id: 1,
        title: 'React 스터디',
        context: '현재 action 을 공부하는 중'
        done: false
    }
}

const [state, dispatch] = useReducer(reducer, initialState);

state 는 Component 에서 사용할 수 있는 상태를 나타내고, dispatch 는 action 을 발생시키는 함수
dispatch 는 dispatch: ({ type: 'ADD_TODO' }) 와 같이 사용
useReducer 의 첫번째 parameter 는 reducer 함수이고, 두번째 parameter 는 초기 상태
*/

// reducer 를 사용하는 방법
function reducer(state, action) {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

function Counter() {
    // reducer 를 사용하는 방법
    const [number, dispatch] = useReducer(reducer, 0);

    // reducer 를 사용하지 않는 방법    
    // const [ number, setNumber ] = useState(0);

    // 함수형 업데이트 형태로 state 의 값을 update 하는 게 좋음 (최적화)
    const onIncrease = () => {
        // reducer 를 사용하는 방법
        dispatch({ type: 'INCREMENT' });

        // reducer 를 사용하지 않는 방법
        // setNumber(number => number + 1);
    };
    
    /*
    const onIncrease = () => setNumber(number + 1); 로 하면 좋지 않은 이유

    setNumber(number + 1);
    setNumber(number + 1);

    위와 같이 setNumber 를 여러 번 시도하면
    각각의 줄에서 setNumber 를 하는 것이 아니라 맨 마지막 number 값만 가져와서 +1 시킴 >> 의도한 바: number + 2, 결과: number + 1
    */
    
    const onDecrease = () => {
        // reducer 를 사용하는 방법
        dispatch({ type: 'DECREMENT' });

        // reducer 를 사용하지 않는 방법
        // setNumber(number => number - 1);
    };

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
}

export default Counter;