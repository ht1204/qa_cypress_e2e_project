Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add(
  'register',
  (
    email = 'riot@qa.team',
    username = 'riot',
    password = '12345Qwert!'
  ) => {
    return cy.request('POST', '/users', {
      email,
      username,
      password
    }).then((response) => {
      const user = {
        ...response.body.user,
        password
      };
      return cy.setCookie('drash_sess', user.token)
        .then(() => cy.wrap(user));
    });
  }
);

Cypress.Commands.add('login', (email, password) => {
  return cy.request('POST', '/users/login', {
    user: { email, password }
  }).then((response) => {
    const token = response.body.user.token;
    return cy.setCookie('drash_sess', token)
      .then(() => cy.wrap(response.body.user));
  });
});

Cypress.Commands.add('createArticle', (articleData) => {
  return cy.getCookie('drash_sess').then((cookie) => {
    const token = cookie ? cookie.value : '';
    return cy.request({
      method: 'POST',
      url: '/articles',
      body: {
        article: {
          author_id: articleData.author_id || 0,
          title: articleData.title,
          description: articleData.description,
          body: articleData.body,
          tags: articleData.tags || ''
        }
      },
      headers: {
        Cookie: `drash_sess=${token}`
      }
    }).then((response) => {
      return cy.wrap(response.body.article);
    });
  });
});
