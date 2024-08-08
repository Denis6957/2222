import { Selector } from 'testcafe';

const env = process.env.TESTCAFE_ENV || 'dev';
const config = require(`../config.${env}.js`);

fixture `Login Page`
    .page `${config.baseUrl}/#/login?logout=true`
    .beforeEach(async t => {
        await t.resizeWindow(1920, 1080);
    });
test('User can log in with valid credentials', async t => {

    try {

    const emailInput = Selector('input[name="login"]');
    const passwordInput = Selector('input[name="password"]');
    const loginButton = Selector('button').withText('Вход').withAttribute('type', 'button');
    const mainPageElement = Selector('#wrapper i').withText('person');


    await t
        .expect(emailInput.exists).ok('Email input not found')
        .expect(passwordInput.exists).ok('Password input not found')
        .expect(loginButton.exists).ok('Login button not found');

        await t.wait(300)
        .typeText(emailInput, config.username) 
        .typeText(passwordInput, config.password)
        .click(loginButton);

    await t
        .expect(mainPageElement.exists).ok('Main page element not found after login');

        console.log('Тест успешно пройден.');
    } catch (error) {
        console.error('Тест не пройден:', error);
        throw error;
    }
});

