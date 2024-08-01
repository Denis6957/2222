import { Selector } from 'testcafe';

const env = process.env.TESTCAFE_ENV || 'dev';
const config = require(`../config.${env}.js`);

fixture `Promo Products Test`
    .page `${config.baseUrl}/#/login?logout=true`
    .beforeEach(async t => {
        await t.resizeWindow(1920, 1080);
    });

test('Test adding and deleting a promo product', async t => {
    try {
        const emailInput = Selector('input[name="login"]');
        const passwordInput = Selector('input[name="password"]');
        const loginButton = Selector('button').withText('Вход');
        const mainPageElement = Selector('#wrapper');

        console.log('Starting test: adding and deleting a promo product...');

        await t.wait(300)
            .expect(emailInput.exists).ok('Email input not found');
        console.log('Email input found.');

        await t.expect(passwordInput.exists).ok('Password input not found');
        console.log('Password input found.');

        await t.expect(loginButton.exists).ok('Login button not found');
        console.log('Login button found.');

        await t.wait(300)
        .typeText(emailInput, config.username) 
        .typeText(passwordInput, config.password)
        .click(loginButton);
        console.log('Logged in with provided credentials.');

        await t.wait(500)
            .expect(mainPageElement.exists).ok('Main page element not found after login');
        console.log('Main page element found after login.');

        const loyaltySectionButton = Selector('#pagesExamples span').withText('Система лояльности');
        const SaleButton = Selector('#idLoyalty span').withText('Скидки');
        const AddSaleButton = Selector('main button').withText('ДОБАВИТЬ');
        const inputNameSale = Selector('#wrapper .form-control').nth(1);
        const inputDescriptionSale = Selector('#wrapper .custom-scroll.simple-text-area');
        const inputPercentSale = Selector('#wrapper .form-control').nth(2);
        const SelectCategory = Selector('#wrapper span').withText('Укажите категорию');
        const SelectProduct = Selector('#wrapper span').withText('Укажите товар');
        const SelectProductReward = Selector('#wrapper .multiselect__tags').nth(19);

        await t
            .click(loyaltySectionButton)
            .click(SaleButton)
            .click(AddSaleButton)
            .click(SelectCategory)
            .click(SelectProductReward);
        
        } catch (error) {
            console.error('Тест не пройден:', error);
            throw error; 
        }
});



