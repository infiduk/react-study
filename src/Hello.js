import React from 'react';

// 비구조화 할당 문법을 이용해 props 값을 받음
function Hello({ value, isSpecial }) {
    return (
        <div style={{color: value}}>
            {/* bool 값에 따라 화면 출력 여부를 결정하는 소스는 && 연산자를 이용해 간단히 표현할 수 있음 */}
            { isSpecial && <b>**</b> }
            Hello World! {value}
        </div>
    );
}

// 현재 Component 의 default 값 설정
Hello.defaultProps = {
    value: 'blue',
    isSpecial: false
}

export default Hello;