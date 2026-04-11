/// <reference types='cypress' />
/// <reference types='../support' />

import ArticleEditPageObject from '../support/pages/articleEdit.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const articleEditPage = new ArticleEditPageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.password);
    });
    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });
  });

  it('should be created using New Article form', () => {
    articleEditPage.visit();

    articleEditPage.typeTitle(article.title);
    articleEditPage.typeDescription(article.description);
    articleEditPage.typeBody(article.body);
    articleEditPage.clickPublishBtn();

    cy.url().should('include', '/articles/');
    articlePage.assertArticleTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    articleEditPage.visit();
    articleEditPage.typeTitle(article.title);
    articleEditPage.typeDescription(article.description);
    articleEditPage.typeBody(article.body);
    articleEditPage.clickPublishBtn();
    cy.url().should('include', '/articles/');

    cy.task('generateArticle').then((updatedArticle) => {
      articlePage.clickEditArticleBtn();

      cy.url().should('include', '/editor/');

      articleEditPage.typeTitle(updatedArticle.title);
      articleEditPage.typeDescription(updatedArticle.description);
      articleEditPage.typeBody(updatedArticle.body);
      articleEditPage.clickPublishBtn();

      cy.url().should('include', '/articles/');
      articlePage.assertArticleTitle(updatedArticle.title);
    });
  });

  it('should be deleted using Delete button', () => {
    articleEditPage.visit();
    articleEditPage.typeTitle(article.title);
    articleEditPage.typeDescription(article.description);
    articleEditPage.typeBody(article.body);
    articleEditPage.clickPublishBtn();
    cy.url().should('include', '/articles/');

    articlePage.clickDeleteArticleBtn();

    cy.url().should('eq', Cypress.config().baseUrl + '#/');
  });
});
