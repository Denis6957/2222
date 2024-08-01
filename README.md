npx cross-env TESTCAFE_ENV=dev testcafe chrome tests/login.test.js
npx cross-env TESTCAFE_ENV=dev testcafe chrome tests/addproduct.test.js


Повторная установка зависимостей проекта:
npm install

Установка axios:
npm install axios

Установка glob:
npm install glob

Установка chalk:
npm install chalk


Общая команда для установки всех плагинов и обновления package.js:
node install_plugins.js

Очистка директорий:
npm run cleanup


const filePath = `${tempDir}/funutai.png`; // Замените на имя файла
const fileUrl = 'https://disk.yandex.ru/i/9nRtLXcN6PkAcQ?export=download'; // Замените на публичную ссылку на Яндекс.Диск
