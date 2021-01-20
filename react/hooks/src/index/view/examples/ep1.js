import React, { useState, useEffect } from 'react';

// useState利用闭包，在函数内部创建一个当前函数组件的状态。并提供一个修改该状态的方法

function Demo({ name, age }) {
  const [counter, setCounter] = useState({ a: 1, b: 0 });

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${counter.b} times`;
  });

  return [
    <div key="eg-div">counter: {counter.b}</div>,
    <button key="eg-b" onClick={() => setCounter({a: 1, b: counter.b + 1})}>
      点击+1
    </button>
  ]
}

export default Demo;