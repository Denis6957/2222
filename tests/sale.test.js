import { Selector } from 'testcafe';

const env = process.env.TESTCAFE_ENV || 'dev';
const config = require(`../config.${env}.js`);

fixture `Sale for products test`
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
        const inputPriceWithoutDiscount = Selector('#wrapper .form-control').nth(3);
        const inputPriceWithDiscount = Selector('#wrapper .form-control').nth(4);
        const SelectCategory = Selector('#wrapper span').withText('Укажите категорию');
        const SetTime = Selector('#wrapper .check').nth(2);
        const SelectProductReward = Selector('#wrapper .multiselect__tags').nth(2);
        const SelectDate = Selector('#wrapper .mx-input')
        const SaveSale = Selector('#wrapper a').withText('ДОБАВИТЬ И ВЕРНУТЬСЯ К СПИСКУ');

        await t
            .click(loyaltySectionButton)
            .click(SaleButton)
            .click(AddSaleButton)
            .click(SelectCategory)
            .click(SelectProductReward)
            .typeText(SelectProductReward, 'Test Product')
            .pressKey('enter')
            .typeText(inputNameSale, 'Test Sale')
            .typeText(inputDescriptionSale, 'Test descriotion sale')
            .typeText(inputPriceWithoutDiscount, '100')
            .typeText(inputPriceWithDiscount, '50')
            .click(SetTime);

        await t
            .click(SelectDate)
            .typeText(SelectDate, '17.08.2035 ~ 14.08.2070')
            .click(SaveSale);

        await t
            .expect(loyaltySectionButton.exists).ok('Discount was not created. Exit to list failed.');

        console.log ('Тест успешно пройден');

        
        } catch (error) {
            console.error('Тест не пройден:', error);
            throw error; 
        }
});



