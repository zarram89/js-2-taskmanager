# Менеджер задач

Учебный демо-проект от HTML Academy для 22 потока профессионального онлайн‑курса «JavaScript. Архитектура клиентских приложений».

## Почитать
[Алгоритмы и структуры данных на JavaScript]
(https://github.com/trekhleb/javascript-algorithms/blob/master/README.ru-RU.md)

```js
class GuitarPlayer {
  #skill;
  #guitarCount;

  constructor(skill, guitarCount) {
    this.#skill = skill;
    this.#guitarCount = guitarCount;
  }

  static createJuniorGuitarPlayer() {
    return new this(5, 2);
  }

  get skill() {
    return {
      skill: this.#skill,
      guitarCount: this.#guitarCount,
    };
  }

  set skill(value) {
    this.#skill = value;
  }
}

const noviceGuitarPlayer = GuitarPlayer.createJuniorGuitarPlayer();

console.log(noviceGuitarPlayer);

// Воспользуемся get
console.log(noviceGuitarPlayer.skill);

// Установим новое значение для уровня через set
noviceGuitarPlayer.skill = 80;

// Вновь получим значение
console.log(noviceGuitarPlayer.skill);
```

## Привязка контекса
```js
// Параметры будут переданы через call и apply
const say = function(birthDate, guitarCount) {
  return `Меня зовут: ${this.firstName} ${this.lastName}. Дата рождения: ${birthDate}. Гитар в коллекции: ${guitarCount}.`;
};

const guitarPlayer = {
  firstName: 'Curt',
  lastName: 'Cobain',
};

const anotherGuitarPlayer = {
  firstName: 'Richie',
  lastName: 'Sambora',
};

console.log(say.call(anotherGuitarPlayer, '20.02.1967', 19));
console.log(say.apply(guitarPlayer, ['20.02.1967', 277]));
```
в `.call()` аргументы нужно передавать через запятую (мнемоника comma, англ. «запятая»). Первым аргументом передаётся новый контекст, вторым и последующими — параметры функции.

функция.call(новый_контекст, параметр_функции_1, параметр_функции_2, ...)
в .apply() первым аргументом передаётся новый контекст, вторым — массив с параметрами функции (мнемоника array, англ. «массив»).

функция.apply(новый_контекст, [параметр_функции_1, параметр_функции_2, ...])
Результатом вызова методов .call() и .apply() будет новая функция с заданным контекстом.

Самописный bind
```js
const bindContext = function (context, fn) {
  return function (...args) {
    return fn.call(context, ...args);
  };
};

const bindContext = (context, fn) => (...args) => fn.call(context, ...args);
```
### Bind в JS
```js
class ButtonView {
  constructor(element) {
    this.element = element;
    this.componentName = 'ButtonView';

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  setListeners() {
    this.element.addEventListener('click', this.onButtonClick);
  }

  onButtonClick() {
    console.log(this.componentName);
  }
}

const buttonElement = document.querySelector('button');
const buttonView = new ButtonView(buttonElement);
buttonView.setListeners();
```
### Привязка через стрелочную функцию

у стрелочных функций нет своего контекста, они запоминают контекст места, где были объявлены.

И если стрелочную функцию объявить в классе, записав в свойство, мы «заставим» её запомнить контекст объявление — наш класс.
```js
'use strict';

class ButtonView {
  constructor(element) {
    this.element = element;
    this.componentName = 'ButtonView';
  }

  setListeners() {
    this.element.addEventListener('click', this.onButtonClick);
  }

  onButtonClick = () => {
    console.log(this.componentName);

    this.element.removeEventListener('click', this.onButtonClick);
  }
}

const buttonElement = document.querySelector('button');
const buttonView = new ButtonView(buttonElement);
buttonView.setListeners();
```
## Классы 
```js
class GuitarPlayer {
  // Объявляем приватные свойства
  #firstName;
  #lastName;

  constructor(firstName, lastName) {
    // Записываем в приватные свойства полученные значения
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  // Объявляем приватный метод
  #createPhrase = () => {
    return `My name is ${this.#firstName} ${this.#lastName}`;
  }

  sayMyName() {
    console.log(this.#createPhrase());
  }
}

const player = new GuitarPlayer('Richie', 'Sambora');

player.sayMyName(); // Выведет в консоль 'My name is Richie Sambora'

console.log(player.#createPhrase()); // Ошибка!
```

## JSDoc

/**
 * Имя кота
 * @type {string}
 */
const catName = 'Кекс';


/**
 * Функция, которая выводит в консоль имя и титул
 * @param {string} myName Имя, которое будет напечатано
 * @param {string} [title=''] Как к вам обращаться
 * @param {boolean} [isCat] А кот ли ты?
 */
function printMyName(myName, title = '', isCat) {
  if (isCat) {
    // Ну, ок
  }
  console.log(`${title} ${myName}`);
}

printMyName('Кекс', 'Ваше котейшество');


С помощью тега @returns можно описать и типизировать значение, которое возвращает функция.

/**
 * @param {string} firstString
 * @param {string} secondString
 * @returns {string} Сконкатенированные строки
 */
function concat(firstString, secondString) {
  return firstString + secondString;
}

const NameWithTitle = concat('Ваше котейшество', 'Кекс');

/**
 * @const
 */
const PI = 3.14;

/**
 * @enum {string}
 */
const Method = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};

/**
 * @class
 */
class AbstractClass {
  constructor() {
    if (new.target === AbstractClass) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  /**
   * @abstract
   */
  doSomething() {
    throw new Error('Abstract method not implemented: doSomething');
  }
}

## Как пользоваться репозиторием

Первый вариант, это изучать коммиты [в веб-интерфейсе GitHub в main-ветке потока](https://github.com/htmlacademy-ecmascript/taskmanager-22).

Второй вариант, изучать коммиты локально. Для этого нужно:

1. Склонировать репозиторий на свой компьютер. Именно склонировать, а не скачать архив.

2. Открыть папку репозитория в терминале, который поддерживает Git.

3. Убедиться, что ветка `main`.

4. С помощью команды `git log --oneline` посмотреть список коммитов. Коммиты идут сверху вниз от новых к старым, выглядит это примерно вот так:

    ```bash
    c0ea9d8 1.2 Создаст функцию для генерации разметки меню WIP
    1a34516 1.1 Подключит скрипт `src/main.js` к `public/index.html`
    45f1ffe :hatching_chick: начальное состояние проекта
    ```

5. Найти нужный коммит, скопировать его хэш (цифро-буквенный код в начале строки).

6. Встать на нужный коммит с помощью команды `git checkout хэш_коммита`. Например, вот так `git checkout c0ea9d8`.

7. Всё, изучайте код конкретного коммита. Чтобы вернуть всё как было, используйте команду `git checkout main`.

> **Будьте внимательны**, если вы внесёте изменения в момент, когда изучаете коммиты, при попытке вернуться обратно, Git потребует от вас либо откатить изменения, либо закоммитить их. Пока вы не сделаете это, вернуться на main-ветку у вас не выйдет.

### Условные обозначения

- Приписка `WIP` в названии коммита означает, что код в этом коммите может частично или полностью не работать, вызывать ошибки линтера, ломать сборку (`npm run build`) или не запускаться в режиме разработки (`npm run start`). Это нормально, потому что `WIP` — это аббревиатура `Work In Progress`, что дословно означает «работа в процессе». То есть такой коммит отражает некое промежуточное состояние нашего проекта.
- Номер коммита `A. [B. ]C` расшифровывается, если не оговорено другое, следующим образом:
  - `A.` — номер модуля;
  - `[B. ]` — номер части домашнего задания. Квадратные скобки означают опциональность, потому что не все домашние задания даются в двух частях;
  - `C.` — порядковый номер. Исключительно для удобства.
