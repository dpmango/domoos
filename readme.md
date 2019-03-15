# Domoos Project

Проект условно делится на 2 части:

### Cтатическая

Gulp, Wepack, Pug, Stylus + Rupture, jQuery (файл App.js). HTML структура проекта сгенерированна Pug шаблонизатором. Каждая страница состоит из блоков, расположеных в /blocks. Блоки состоят из Pug файлов и миксинов расположенных в /blocks/mixins.pug. Миксины используются для часто повторяющихся HTML элементов: дропадауны, слайдеры, акардионы и формы обратной связи. Стили некоторых блоков, например header, меняются в зависимости от страницы на которой они находяться.

Фрейморк для стиле - Stylus. Стили храняться в /styles, написаны в формате SCSS для упрощенного перехода на Styled Components в будущем. Используются CSS3 переменные. Подход к адаптивке - мобайл фёрст. При описании адаптивки распологать брейкпойнты от меньшего к большему сверху в низ. Файлы стилей делятся на: базовые (0 - миксины, 1 - переменные, 2 - css сброс, 3 - шрифты, 4 - базовые стилизованные элементы, 5 - повторяющиеся css-конструкции), /vendors - стили сторонних библиотек. Точки входа стилей: /styles/app.styl - стили статики, /scripts/react.styl - стили react компонентов.

### Асинхронная

React + Redux, Redux Actions, Axios + не Rest (!), ES6. На этом уровене загружаются React компоненты, они рендеряться в статику по определенным айдишникам, если те существуют. В некоторых компонентах встречаются PropTypes. Точка входа для всех реaкт-компонентов /scripts/react.js

API проекта распологается на сабдомене, для работы с ним используется proxy-middleware, которая настраивается в конфиге локального сервера /gulp/server.js.

В проекте созданы глобальные переменные окружения Dev/Production
На выходе получаем папку /dist, в которой зраниться сгенерированный html + статика разбитая по папкам.

# Работа со сборкой

Для работы с проектом должна быть установлена Node.js.  
Если Node.js стоит, устанавливаем модули использующиеся в проекте:

```
npm i
```

Запустить локальный сервер для разарботки:

```
npm start
```

Создать production сборку, затем поместить ее в архив, который будет лежать в корне:

```
npm run production; npm run zip;
```

Заархивировать текущую сборку в архив:

```
npm run zip;
```

# Git hooks

Используется husky. Перед каждым git push запускается линтер. Если линтер падает с ошибкой, git push не пройдет. Пропустить линтинг можно, используя git push --no-verify

[исключен из зависимостей, но можно добавить и все заработает]

# Must Have

Работать с проектом рекомендуется в Visual Studio Code, у становленными плагинами: Prettier, Editor Config, ES Lint, Language Stylus, Manta's Stylus Supremacy. Эти плагины активируют конфиги в корне проекта, которые отвечают за автоформатирование JS / CSS, что позволяет соблюдать определенный style-код для всех разработчиков во всех файлах проекта.

[Если автоформатирование не работает, возможно надо прописать в конфиге VS Code активацию автоформатированию по ctrl + s]

# Полезные ссылки

`https://trello.com/b/CrDducH5/domoos` - Доска с задачами по проекту.  
`https://github.com/CSSSR/csssr-project-template` - Сам проект сделан на основе фронтенд сборки CSSSR, c ее более подробным описанием можно ознакомиться по ссылке выше.  
`https://dev.domoos.ru` - Дев сервер для тестирования продакшн сборки  
`https://api.domoos.ru` - АПИ для доступа к базе

# Остальные фичи

Для скриптов настроен Babel с пресетами es2015 и react  
SVG спрайты - минимимизируем количество запросов к серверу  
Дропдауны, табы, аккардионы - работают на CSS  
Слайдеры - jQuery / React slick  
Некоторые блоки написаны с помощью bemto (не пугаться)

# TODO

Подключить pug автоформатер  
Настроить автодеплой проекта на сайт  
Отрефакторить компонент CityExplorer, разделить его на саб-компоненты.  
Прописать статике хэши для кэширования.  
Заполнить мету в /head  
Микроформаты  
Перенести фейкодату из секций в json файлы расположенные в /data

#credentials

Вопросы по работе проекта можно задать в телеграмме: @toastyboost
