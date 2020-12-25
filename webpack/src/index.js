import { print } from './num.js';
import _ from 'lodash';
import { observable } from 'mobx';

console.log(123);
console.log(observable);

console.log(_.chunk(['a', 'b', 'c', 'd'], 2));

print()

function button () {
  const button = document.createElement('button')
  const text = document.createTextNode('click me')
  button.appendChild(text)
  button.onclick = e => import('./info.js').then(res => {
    console.log(res.log)
  })
  return button
}

document.body.appendChild(button())