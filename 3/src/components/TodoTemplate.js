import React from 'react';
import styled from 'styled-components';

const TodoTemplateBlock = styled.div`
    width: 512px;
    height: 768px;

    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

    margin-top: 96px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
`;

// 화면 중앙에 흰색 박스를 띄워주는 Component
function TodoTemplate({ children }) {
    return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;