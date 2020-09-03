import React, { useState, useRef } from 'react';

function InputSample() {
    // 여러 개의 state 를 사용할 때, 의도가 비슷한 state 끼리 묶어 객체 형태로 state 를 활용할 수 있음
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });

    // name input focus 용 ref 선언
    const nameRef = useRef();

    // inputs 의 state 꺼내 놓기
    const { name, nickname } = inputs;

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            // React 에서는 값을 update 할 때, 직접 update 하면 안됨
            // 반드시 state 의 복사 값을 만들어 놓고 그 값으로 변경시켜야 함 (불변성)
            ...inputs,
            // target 의 name 에 value 를 넣음
            [name]: value
        });
    }
    const onReset = () => {
        setInputs({
            name: '',
            nickname: ''
        });
        // 버튼을 클릭하면 nameRef 가 있는 ref 에 focus 주기
        nameRef.current.focus();
    }

    return (
        <div>
            <input onChange={onChange} name="name" value={name} placeholder="이름" ref={nameRef} />
            <input onChange={onChange} name="nickname" value={nickname} placeholder="닉네임" />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>{name}({nickname})
            </div>
        </div>
    );
}

export default InputSample;