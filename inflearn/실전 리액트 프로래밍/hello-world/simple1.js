// js-function: 버튼을 클릭하면 버튼이 토글됨
function LikeButton() {
  // 버튼의 현재 상태를 저장하는 변수와 버튼이 토글될 때 상태 값을 변경하는 함수
  // React 는 react.development.js 가 실행될 때 전역 변수로 노출이 되어 사용할 수 있음
  // useState 함수는 컴포넌트의 상태 값을 추가할 때 사용 (첫번째 매개 변수: 기본 값)
  const [liked, setLiked] = React.useState(false);
  // 상태 값에 따라 보여줄 문구 지정
  const text = liked ? '좋아요 취소' : '좋아요'
  // createElement 는 리액트 요소를 반환 (첫번째 매개 변수: 리액트 요소, 두번째 매개 변수: 속성 값, 세번째 이후 매개 변수: children)
  // 리액트 UI 를 표현 하는 가장 작은 단위가 리액트 요소 
  return React.createElement(
    // 버튼을 만들고자 하면 'button' 을 첫번째 매개 변수에 할당 하면 되고, 이게 html 의 button 태그로 변경됨
    'button',
    // 리액트 요소에 이벤트를 주고 싶을 땐 두번째 매개 변수에 할당 하면 됨
    // 클릭 시 상태 값을 변경시킴
    { onClick: () => setLiked(!liked) },
    // 리액트 요소에 children 을 넣고자 할 땐 세번째 이후 매개 변수에 할당 하면 됨
    // 상태 값에 따라 문구를 보여주기 위해 text 로 값을 할당
    text
  )
}
// hmtl 파일의 root 라는 id 를 가진 div 안에 렌더링을 하기 위해 해당 div 를 찾음
const domContainer = document.getElementById('root');
// ReactDOM 은 react-dom.development.js 가 실행될 때 전역 변수로 노출이 되어 사용할 수 있음
// 컴포넌트를 렌더링 할 때도 리액트 요소로 만들어 줌 
// LikeButton 이라는 컴포넌트를 domContainer 에 렌더링 하겠다는 내용
ReactDOM.render(React.createElement(LikeButton), domContainer);

/*
-- simple1.html
<div>
  <p>hello</p>
  <p>world</p>
</div> 라는 컴포넌트를 만드는 방법
--
-- simple1.js
React.createElement(
  'div',
  null,
  React.createElement('p', null, 'hello'),
  React.createElement('p', null, 'world')
);
--
*/

/*
DOM 의 여러 요소에 렌더링 하는 방법 (보통은 DOM 요소 하나에 렌더링)
각각의 LikeButton state 가 만들어짐
-- simple1.html
<h3>root1</h3>
<div id="root1"></div>
<h3>root2</h3>
<div id="root2"></div>
<h3>root3</h3>
<div id="root3"></div>
--
-- simple1.js
const domContainer1 = document.getElementById('root1');
ReactDOM.render(React.createElement(LikeButton), domContainer1);
const domContainer2 = document.getElementById('root2');
ReactDOM.render(React.createElement(LikeButton), domContainer2);
const domContainer3 = document.getElementById('root3');
ReactDOM.render(React.createElement(LikeButton), domContainer3);
--
*/

/*
html 파일에 여러 요소를 만드는 것 보다 리액트 안에서 해결하는 것이 좋음
-- simple1.js
const domContainer = document.getElementById('root');
ReactDOM.render(
  React.createElement(
    'div',
    null,
    React.createElement(LikeButton),
    React.createElement(LikeButton),
    React.createElement(LikeButton)
  ),
  domContainer
);
--
*/