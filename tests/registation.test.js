import { Selector } from 'testcafe';

const env = process.env.TESTCAFE_ENV || 'dev';
const config = require(`../config.${env}.js`);

fixture `Login Page`
    .page `${config.baseUrl}/#/login?logout=true`
    .beforeEach(async t => {
        await t.resizeWindow(1920, 1080);
    });

test('Test registration user on eDA-platform', async t => {

  const inputNameCompany = Selector('.input-property [name="companyName"]');
  const inputCityCompany = Selector('.input-property').nth(1).find('[name="companyCity"]');
  const inputINN = Selector('.input-property').nth(2).find('[name="inn"]');
  const inputCEO = Selector('.input-property').nth(3).find('[name="ownerName"]');
  const inputContactFace = Selector('.input-property').nth(4).find('[name="contactPersonName"]');
  const inputPhoneNumber = Selector('.input-property').nth(5).find('[name="phone"]');
  const inputEmail = Selector('.input-property').nth(6).find('[name="email"]');
  const CheckBoxNewLeed = Selector('.check');
  const RegButton = Selector('button').withText('Зарегистрироваться');
  const RegistrButton = Selector('#registreForm a').withText('Зарегистрироваться');
  const Succes = Selector('div').withText('×').nth(8);

  try {
    
    await t.click(RegistrButton);

    await t.expect(inputNameCompany.exists).ok('No elements on page');

    await t
      .typeText(inputNameCompany, 'New Company')
      .typeText(inputCityCompany, 'Novokuznetsk')
      .typeText(inputINN, '11111111')
      .typeText(inputCEO, 'Ivanov Ivan Ivanovich')
      .typeText(inputContactFace, 'Demidov Dmitry Dmitrievich')
      .typeText(inputPhoneNumber, '79999999999')
      .typeText(inputEmail, 'email@email.com');

    await t.click(CheckBoxNewLeed).click(RegButton);

    await t
    .expect(Succes.exists).ok('Successful registration message not found');

    console.log('Тест успешно пройден.');
  } catch (error) {
    console.error('Тест не пройден:', error);
    throw error;
  }
});

