import React, { useState } from 'react';

function Counter() {
    const [ number, setNumber ] = useState(0);

    // 함수형 업데이트 형태로 state 의 값을 update 하는 게 좋음 (최적화)
    const onIncrease = () => setNumber(number => number + 1);
    
    /*
    const onIncrease = () => setNumber(number + 1); 로 하면 좋지 않은 이유

    setNumber(number + 1);
    setNumber(number + 1);

    위와 같이 setNumber 를 여러 번 시도하면
    각각의 줄에서 setNumber 를 하는 것이 아니라 맨 마지막 number 값만 가져와서 +1 시킴 >> 의도한 바: number + 2, 결과: number + 1
    */
    
    const onDecrease = () => setNumber(number => number - 1);

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
}

export default Counter;