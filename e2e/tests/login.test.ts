import { Selector, ClientFunction } from 'testcafe';

const getLocation = ClientFunction(() => document.location.href);

const login = async (t : TestController, username : string, password : string) => {
    await t
        .typeText(Selector('input[name="username"]'), username, { replace: true })
        .typeText(Selector('input[name="password"]'), password, { replace: true })
        .click(Selector('button').withText('Se connecter'));
};

fixture('Authentication and dashboard tests')
    .page('http://localhost:4200/login');

test.meta({ID:'43' ,description: 'Test successful login and logout behavior',issue: '123', severity: 'critical' })
('Connection successful and logout', async t => {
    await login(t, 'admin', 'password123');

    await t
        .expect(getLocation()).contains('/dashboard')
        .expect(Selector('h1').innerText).eql('Tableau de bord');

    await t
        .click(Selector('button').withText('log out'))
        .expect(getLocation()).contains('/login')
        .expect(Selector('input[name="username"]').exists).ok();
});

test.meta({description: 'Test successful login and logout behavior', issue: '123', severity: 'critical' })
('Connection refused with wrong credentials', async t => {
    await login(t, 'admin', 'wrongPassword');

    await t
        .expect(Selector('.error-message').innerText)
        .contains('Nom d\'utilisateur ou mot de passe incorrect')
        .expect(getLocation()).contains('/login');
});

test.meta({description: 'Test successful login and logout behavior', issue: '123', severity: 'critical' })
('Search with result', async t => {
    await login(t, 'admin', 'password123');
    await t.expect(getLocation()).contains('/dashboard');

    await t
        .typeText(Selector('input[name="personName"]'), 'Dupont', { replace: true })
        .click(Selector('button').withText('Rechercher'));

    await t
        .expect(Selector('table tbody tr td').withText('Dupont').exists)
        .ok();

    await t
        .click(Selector('button').withText('log out'))
        .expect(getLocation()).contains('/login');
});

test.meta({description: 'Test successful login and logout behavior', issue: '123', severity: 'critical' })
('Search without results', async t => {
    await login(t, 'admin', 'password123');
    await t.expect(getLocation()).contains('/dashboard');

    await t
        .typeText(Selector('input[name="personName"]'), 'Inexistant', { replace: true })
        .click(Selector('button').withText('Rechercher'));

    await t
        .expect(Selector('table tbody tr td').innerText)
        .eql('No data available.');

    await t
        .click(Selector('button').withText('log out'))
        .expect(getLocation()).contains('/login');
});

test.meta({description: 'Test successful login and logout behavior', issue: '123', severity: 'critical' })
('Search with empty input displays all data', async t => {
  await login(t, 'admin', 'password123');
  await t.expect(getLocation()).contains('/dashboard');

  const inputSelector = Selector('input[name="personName"]');
  await t
      .selectText(inputSelector)
      .pressKey('delete')
      .click(Selector('button').withText('Rechercher'));

  const rowCount = await Selector('table tbody tr').count;
  await t.expect(rowCount).eql(8);

  await t
      .click(Selector('button').withText('log out'))
      .expect(getLocation()).contains('/login');
});

test.meta({description: 'Test successful login and logout behavior', issue: '123', severity: 'critical' })
('Direct dashboard access without login redirects to login', async t => {
    await t.navigateTo('http://localhost:4200/dashboard');
    await t.expect(getLocation()).contains('/login');
});