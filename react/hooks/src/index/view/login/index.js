/**
 * @file 认识hooks
 * @author haoran
 * @description Hooks并不是神秘 它就是函数式组件
 * 更准确的概述是 有状态的函数式组件
 */
// ----------------------------eg1 start------------------------------------
// import React, { useState } from 'react';

// useState利用闭包，在函数内部创建一个当前函数组件的状态。并提供一个修改该状态的方法

// function Demo({ name, age }) {
//   const [counter, setCounter] = useState({ a: 1, b: 2 });

//   return [
//     <div>counter: {counter.b}</div>,
//     <button key="b" onClick={() => setCounter(counter)}>
//       点击+1
//     </button>
//   ]
// }

// export default Demo;
// ----------------------------eg1 end--------------------------------------

// ----------------------------eg2 start------------------------------------
// import React, { useState } from 'react';
// import { Slider } from 'antd-mobile';

// export default function Rectangle() {
//   const [height, setHeight] = useState(10);
//   const [width, setWidth] = useState(10);
//   const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
//   const [radius, setRadius] = useState(0);

//   const style = {
//     height: `${height}px`,
//     width: `${width}px`,
//     backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
//     borderRadius: `${radius}px`
//   }

//   return (
//     <div className="container">
//       <p>height:</p>
//       <Slider
//         max={300}
//         min={10}
//         onChange={(n) => setHeight(n || 0)}
//       />
//       <p>width:</p>
//       <Slider
//         max={300}
//         min={10}
//         onChange={(n) => setWidth(n || 0)}
//       />

//       <p>color: R:</p>
//       <Slider
//         max={255}
//         min={0}
//         onChange={(n = 0) => setColor({ ...color, r: n })}
//       />

//       <p>color: G:</p>
//       <Slider
//         max={255}
//         min={0}
//         onChange={(n = 0) => setColor({ ...color, g: n })}
//       />

//       <p>color: B:</p>
//       <Slider
//         max={255}
//         min={0}
//         onChange={(n = 0) => setColor({ ...color, b: n })}
//       />
//       <p>Radius:</p>
//       <Slider
//         max={150}
//         min={0}
//         onChange={(n = 0) => setRadius(n)}
//       />
//       <div className="reatangle" style={style} />
//     </div>
//   )
// }

// ----------------------------eg3 start------------------------------------
// import React, { useState } from 'react';

// // 定义为同步变量
// // let param = {};

// export default function AsyncDemo() {
//   const [ param ] = useState({})
//   const [ listData, setListData ] = useState([{name: 1}]);

//   function fetchListData() {
//     setTimeout(() => {
//       setListData([{ 'name': param.name }]);
//     }, 1000);
//   }

//   function searchByName(name) {
//     param.name = name;
//     fetchListData();
//   }

//   return (
//     <div>
//       <div>data list</div>
//       {
//         listData.map((item, idx) => {return (<div key={idx}>{item.name}</div>)})
//       }
//       <button onClick={() => searchByName('Jone')}>search by name</button>
//     </div>
//   )

// }
// ----------------------------eg3 end--------------------------------------

// ----------------------------eg4 start------------------------------------
//hooks的设计中，每一次DOM渲染完成，都会有当次渲染的副作用可以执行。而useEffect，是一种提供我们能够自定义副作用逻辑的方式
// import React, { useState, useRef, useEffect } from 'react';
// import anime from 'animejs';
// import "./index.less"

// export default function AnimateDemo() {
//   const [anime01, setAnime01] = useState(false);
//   const [anime02, setAnime02] = useState(false);
//   const element = useRef();

//   useEffect(() => {
//     anime01 && !anime02 && animate01();
//     anime02 && !anime01 && animate02();
//   }, [anime01, anime02]);

//   function animate01() {
//     if (element) {
//       anime({
//         targets: element.current,
//         translateX: 400,
//         backgroundColor: '#FF8F42',
//         borderRadius: ['0%', '50%'],
//         complete: () => {
//           setAnime01(false);
//         }
//       })
//     }
//   }

//   function animate02() {
//     if (element) {
//       anime({
//         targets: element.current,
//         translateX: 0,
//         backgroundColor: '#FFF',
//         borderRadius: ['50%', '0%'],
//         easing: 'easeInOutQuad',
//         complete: () => {
//           setAnime02(false);
//         }
//       })
//     }
//   }

//   function clickHandler() {
//     setAnime01(true);
//     setTimeout(setAnime02.bind(null, true), 500);
//   }

//   return (
//     <div className="container" onClick={clickHandler}>
//       <div className="el" ref={element} />
//     </div>
//   )
// }
// ----------------------------eg4 end--------------------------------------

// ----------------------------eg5 start------------------------------------

// import React, { useState, useEffect } from 'react';

// export default function AnimateDemo() {
//   const [counter, setCounter] = useState(0);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setCounter(counter + 1);
//     }, 300);
//     console.log('effect:', timer);

//     return () => {
//       console.log('clear:', timer);
//       clearTimeout(timer);
//     }
//   });

//   console.log('before render');

//   return (
//     <div className="container">
//       <div className="el">{counter}</div>
//     </div>
//   )
// }

// before render
// effect: setTimeout id
// 

// ----------------------------eg5 end--------------------------------------

// ----------------------------eg6 start------------------------------------
import React, { useMemo, useState, useCallback } from 'react';
import { Button } from 'antd-mobile';

export default function App() {
  const [target, setTarget] = useState(0);
  const [other, setOther] = useState(0)

  const sum = useMemo(() => {
    console.log('重新计算一次');
    let _sum = 0;
    for (let i = 1; i <= target; i++) {
      _sum += i;
    }
    return _sum;
  }, [target]);

  const inputChange = useCallback((e) => {
    console.log(e.target.value);
  }, []);

  return (
    <div style={{ width: '200px', margin: 'auto' }}>
      <input type="text" onChange={inputChange} />
      <div style={{ width: '80px', margin: '100px auto', fontSize: '40px' }}>{target} {sum}</div>
      <Button onClick={() => setTarget(target + 1)}>递增</Button>
      <Button onClick={() => setTarget(target - 1)}>递减</Button>

      <div style={{ width: '80px', margin: '100px auto', fontSize: '20px' }}>干扰项 {other}</div>
      <Button onClick={() => setOther(other + 1)}>递增</Button>
      <Button onClick={() => setOther(other - 1)}>递减</Button>
    </div>
  )
}
// ----------------------------eg6 end--------------------------------------

// ----------------------------eg7 start------------------------------------
// ----------------------------eg7 end--------------------------------------