import React from 'react';

// 자식 Component 를 띄우기 위한 children props
function Wrapper({ children }) {
  const style = {
    border: '2px solid black',
    padding: '16px',
  };
  return (
    <div style={style}>
      {/* Component 띄우기 */}
        {children}
    </div>
  )
}

export default Wrapper;