import { useState, useCallback } from 'react';

/*
Component 에서 반복되는 로직이 많을 때, 커스텀 Hooks 를 만들어서 로직을 재사용

소스 안에서 useState, useEffect, useReducer, useCallback 등의 Hooks 를 사용하여 원하는 기능을 구현
기능에서 반환되는 값은 Component 에서 사용하고 싶은 값들로 설정
*/

function useInputs(initialForm) {
    const [form, setForm] = useState(initialForm);

    const onChange = useCallback(e => {
        const { name, value } = e.target;
        setForm(form => ({ ...form, [name]: value }));
    }, []);
    
    const reset = useCallback(() => setForm(initialForm), [initialForm]);

    return [form, onChange, reset];
}

export default useInputs;