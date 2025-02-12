# Пример использования MSW для разработки и тестов

## Полезные ссылки

[Презентация](https://slides.com/sergeyzenin/mocking-api-with-mock-service-worker)

### Service Workers
1. [MDN. Service Worker API](https://developer.mozilla.org/ru/docs/Web/API/Service_Worker_API)
2. [Habr. Service Workers. Инструкция по применению](https://habr.com/ru/companies/2gis/articles/345552/)

### MSW
1. [MSW. Site](https://mswjs.io/)
2. [MSW. Github](https://github.com/mswjs/msw)
3. [MSW. Examples](https://github.com/mswjs/examples/tree/master/examples)

## Работа с приложением
Данная демка, по-сути, приложение из 3-х частей. Имитирует сервис с базой блюд 🧆 и созданием меню на день. Все на заглушках - меню будет одинаковое всегда 🙂 

### client
Клиентская часть на [Vite](https://vite.dev/) + [React](https://react.dev/). Состоит из 4-х страниц:
1. **`/`** - Меню на сегодня
2. **`/dishes`** - Список блюд
3. **`/websocket`** - Пример с WebSocket
4. **`/async`** - Пример с Websocket с асинхронной подгрузкой моков

#### Скрипты (Перед выполнением не забываем про установку пакетов - `npm install`)
1. **`npm run dev`** - запуск в режиме разработчика без MSW. При редактировании блюд будет ошибка `not found` и нотификация с текстом ошибки. Счетчик на странице `/websocket` будет работать исправно. На странице `/async` будут в хаотичном порядке появляться 2 фичи и асинхронно запрашиваться их API
2. **`npm run dev:msw`** - запуск в режиме разработчика с использованием MSW. При редактировании блюд будет нотификация с текстом - `Ok`. При написании значения "1" в поле имени блюда при редактировании, при отправке будет ошибка, что такое имя уже есть. На странице `/websocket` кнопка "минус" станет неисправной. На странице `/async` будут в хаотичном порядке появляться 2 фичи и асинхронно запрашиваться их API, Так же вместе с API будут запрашиваться моки, которые можно включать и отключать переключателем на странице
3. **`npm run dev:msw-scenario`** - отличие от `npm run dev:msw` в том, что на странице `/websocket` обе кнопки будут неисправны
4. **`npm run test`** - запуск тестов.
5. **`npm run generate-mocks`** - пример генерации моков по openapi документации

### server
Сервис на [fastify](https://www.fastify.io/). Основной бэк.

Есть 2 эндпойнта:
1. GET `/dishes` - отдает список блюд
2. GET `/menu` - отдает меню

#### Скрипты (Перед выполнением не забываем про установку пакетов - `npm install`)
1. `npm start` - запуск приложения

### price-sevice
Приложение на [fastify](https://www.fastify.io/). Сервис, который прикручивает цену к блюдам и отдает результат

Есть 2 эндпойнта:
1. GET `/` - получение списка блюд, обогащенных ценой
2. GET `/pretty` - получение списка блюд, обогащенных ценой в читаемом варианте, при запросе через адресную строку браузера

