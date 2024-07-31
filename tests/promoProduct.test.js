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
        const promoProductsButton = Selector('#idLoyalty span').withText('Промо-товары');
        const addNewPromoProductButton = Selector('main button').withText('ДОБАВИТЬ');
        const promoProductNameInput = Selector('#wrapper .form-control').nth(1);
        const promoProductDescriptionInput = Selector('#wrapper .custom-scroll.simple-text-area');
        const promoProductSumma = Selector('#wrapper div').withText('Первый заказ').nth(19);
        const promoProductConditionSelect = Selector('#wrapper span').withText('Сумма чека от').nth(1);
        const promoProductRewardProductSelect = Selector('#wrapper .multiselect__tags').nth(2); 
        const savePromoProductButton = Selector('#wrapper a').withText('ДОБАВИТЬ').nth(1);
        const successMessage =  Selector('#wrapper span').withText('Успешное изменение'); 
        const promoProductPrice = Selector('#wrapper .form-control').nth(3);
        const SaveRepeat = Selector('#wrapper a').withText('СОХРАНИТЬ').nth(1);
        const backToPromoProductsListButton = Selector('#wrapper a').withText('НАЗАД');
        const deletePromoProductButton = Selector('main i').withText('close').nth(0); 

        const promoProductName = '000 000';

        await t
            .click(loyaltySectionButton)
            .click(promoProductsButton)
            .click(addNewPromoProductButton);

        console.log('Navigated to the promo product creation form.');

        await t
            .typeText(promoProductNameInput, promoProductName)
            .typeText(promoProductDescriptionInput, 'This is a test promo product description.')
            .click(promoProductSumma)
            .click(promoProductConditionSelect)
            .click(promoProductRewardProductSelect)
            .typeText(promoProductRewardProductSelect, 'Test Product')
            .pressKey('enter')
            .typeText(promoProductPrice, '40');

        await t
            .scroll(0, 10000)
            .click(savePromoProductButton);

        await t.wait(2000)
            .click(SaveRepeat);

        await t
            .expect(successMessage.exists).ok('Success message not found');
        console.log('Promo product saved successfully. Success message found.');

        await t
            .click(backToPromoProductsListButton);
        console.log('Navigated back to the promo product list.');

        await t
            .click(deletePromoProductButton)
            .wait(1000);
        console.log('Promo product deleted.');

        const deletedPromoProduct = Selector('main td').withText(promoProductName);

        await t
            .expect(deletedPromoProduct.exists).notOk('Promo product was not deleted!');
        console.log('Promo product not found. Deletion confirmed.');
        
        console.log('Тест успешно пройден');

    } catch (error) {
        console.error('Тест не пройден:', error);
        throw error; 
    }
});
