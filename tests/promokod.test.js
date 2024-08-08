import { Selector } from 'testcafe';

const env = process.env.TESTCAFE_ENV || 'dev';
const config = require(`../config.${env}.js`);

fixture `Sale for products test`
    .page `${config.baseUrl}/#/login?logout=true`
    .beforeEach(async t => {
        await t.resizeWindow(1920, 1080);
       
    });

test('Test adding and deleting a promo code', async t => {
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
    const Promokody = Selector('#idLoyalty span').withText('Промокоды');
    const AddPromo = Selector('main button').withText('ДОБАВИТЬ');
    const NamePromo = Selector('#wrapper .form-control').nth(1);
    const Promo = Selector('#wrapper .form-control').nth(2);
    const NamePromoGroup = Selector('#wrapper .form-control').nth(3);
    const PromoDescription = Selector('#wrapper .custom-scroll.simple-text-area');
    const SelectProduct = Selector('#wrapper .multiselect__tags').nth(1);
    const SetSum = Selector('#wrapper .form-control').nth(5);
    const SavePromo = Selector('#wrapper a').withText('ДОБАВИТЬ И ВЕРНУТЬСЯ К СПИСКУ');
    const ExpectTest = Selector('main i').withText('close');
    const FoundDelPromo = Selector('main .form-control');
    const DelPromo = Selector('main i').withText('close').nth(0);
    const DelPromoExpect = Selector('main span').withText('Список пуст');

    await t.wait(200)
        .click(loyaltySectionButton)
        .click(Promokody)
        .click(AddPromo);

    await t.wait(200)
        .typeText(NamePromo, 'Test Promo')
        .typeText(Promo, '000')
        .typeText(NamePromoGroup, 'Test Promo')
        .typeText(PromoDescription, 'Test Promo Description');

    await t
        .click(SelectProduct)
        .typeText(SelectProduct, 'Test Product')
        .pressKey('enter')
        .typeText(SetSum, '200')
        .click(SavePromo);

    await t
        .expect(ExpectTest.exists).ok('Promo was not created. Exit to list failed');

    await t.wait(500)
        .typeText(FoundDelPromo, 'Test Promo')
        .click(DelPromo);

    await t
        .expect(DelPromoExpect.exists).ok('The promo code was not removed.');

    console.log('Тест успешно пройден');

    } catch (error) {
            console.error('Тест не пройден:', error);
            throw error; 
        }
}); 
