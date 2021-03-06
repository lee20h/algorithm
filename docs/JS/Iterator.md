# Javascript Iterator

ES6이 도입되면서 많은 개념들이 추가가 되었다. 그 중 다른 언어에서도 많이 사용되는 Iterator(반복자)에 대해 알아보자.

- 레퍼런스
  - [Javascript Iterator](https://medium.com/@la.place/javascript-iterator-b16ca3c51af2)
  - [Javascript와 Iterator](https://pks2974.medium.com/javascript%EC%99%80-iterator-cdee90b11c0f)

## for-of

자바스크립트는 원래 for-in을 통해 object를 순회하였다. 하지만 배열을 순회할 때는 불편한 점이 있고 forEach의 경우에도 프로그래머가 의도한 바로 사용하기 어렵다. 이러한 문제를 보완하기 위해서 ES6에서는 for-of를 도입했다.

for-of의 장점은 밑에서 이야기할 Iterable한 객체. 즉, 열거가능한 객체라면 모두 사용할 수 있다.

## Iterable

Iterable은 객체의 멤버를 반복할 수 있는 객체로, 반복할 object에 [@@iterator] 메소드가 있다면 사용할 수 있다.

다음과 같은 프로퍼티를 사용하면 된다.

`object[Symbol.iterator]`

위에서 이야기한 for-of가 바로 이 프로퍼티를 이용하여 순회하는 것이다.

### Iterable 가진 객체

- Array
- TypedArray
- String
- Map
- Set

### Spread 문법

Spread를 이용하면 iterable 객체를 쉽게 해체할 수 있다.

```js
let txt = "wow";
console.log([...txt]); // ['w', 'o', 'w']
```

## Iterator

Iterator는 객체를 `next()` 메소드로 순환 할 수 있다. 이 메소드의 반환자는 **{done: boolean, value: any}**를 포함해야 한다. 마지막 순서에서는 done을 true로 반환하게 된다.

### 응용

크기가 100이고 값이 모두 0인 초기화된 배열이 필요하다고 할 때, Iterator와 Spread를 이용해보자.

```js
const arr = [];
for (let i = 0; i < 100; i++) {
  arr.push(0);
}
console.log(arr);
```

```js
const arr = [...Array(100).keys()].map((i) => 0);
console.log(arr);
```

## JavaScript Generator

제너레이터는 코루틴(Co-Routine)과 유사하다. 코루틴은 다른 언어에서 접할 수 있는데, A와 B의 코루틴이 존재한다면 서로는 서로의 서브루틴이며, 발동될 때마다 이전에 자신의 마지막 실행지점에서 이어서 실행할 수 있다.

제너레이터도 마찬가지로, 함수 실행 중 멈췄다가 멈춘 위치에서 다시 시작할 수 있다. 또한 위에서 이야기한 Iterator를 가장 쉽게 구현할 수 있는 방법이 바로 제너레이터 객체를 이용하는 것이다.

### 사용

제너레이터는 `function*()` 키워드를 가지고 생성할 수 있으며, 호출시에는 함수가 실행된 뒤 반환값이 반환되는 것이 아니라, Iterator 객체가 반환이 된다. 따라서 `next()`메소드를 가지고 호출하게 되면 제너레이터가 실행이 되고, `yield`를 만나게 되면 해당 값을 `{value, done}` 중 value 프로퍼티에 저장을 하게 된다. 이후엔 제너레이터가 멈추고 현재까지의 컨텍스트는 저장되게 된다.

```js
function* increseNumber() {
  let number = 1;
  while (number <= 100) {
    yield number++;
  }
}

const generator = increseNumber();

console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3
console.log(generator.next().value); // 4
console.log(generator.next().value); // 5
// ...
console.log(generator.next().value); // 99
console.log(generator.next().value); // 100
console.log(generator.next().value); // undefined
```

조금 더 응용하자면 컨텍스트를 저장하는 것을 이용하여 다이나믹 프로그래밍을 쉽게 할 수 있다. 다음은 피보나치 수열을 제너레이터를 가지고 만든 예제이다.

```js
function* fibonacci() {
  let [prev, curr] = [1, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (let n of fibonacci()) {
  console.log(n);

  if (n >= 1000) {
    break;
  }
}
```

다들 제너레이터를 사용하는 진면목은 비동기에서의 사용이라고 한다. 자바스크립트를 이용하여 코딩을 진행하다가 겪을 수 있는 콜백지옥을 프로미스와 제너레이터를 이용하면 수월하게 해결할 수 있다고 한다. 그러한 개념을 접목시킨 것이 바로 `async-await`이다. 자주 사용하게 되는 `async-await`은 별 다른 내용없이 명시만 한다면 비동기 프로그래밍을 매우 쉽게 만들어준다. 하지만 개념을 알 필요가 있다고 생각되기 때문에 밑의 링크를 참고하여 숙지하는 것이 좋아보인다.

- [ES6의 제너레이터를 사용한 비동기 프로그래밍](https://meetup.toast.com/posts/73)
