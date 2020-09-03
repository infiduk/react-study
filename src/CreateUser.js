import React, { useRef, useContext } from 'react';
import useInputs from './hooks/useInputs';
import { UserDispatch } from './App';

const CreateUser = () => {
    // 커스텀 hooks useInputs 를 이용하기 때문에 주석 처리
    // const { username, email } = state.inputs;

    // useInputs 를 사용해 inputs 관리
    const [{ username, email }, onChange, onReset] = useInputs({
        username: '',
        email: ''
    });

    const nextId = useRef(4);

    // UserDispatch 사용을 위한 선언
    const dispatch = useContext(UserDispatch);

    const onCreate = () => {
        dispatch({
            type: 'CREATE_USER',
            user: {
                id: nextId.current,
                username,
                email
            }
        });
        onReset();
        nextId.current += 1;
    };

    return (
        <div>
            <input
                name="username"
                placeholder="계정명"
                onChange={onChange}
                value={username}
            />
            <input
                name="email"
                placeholder="이메일"
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

export default React.memo(CreateUser);