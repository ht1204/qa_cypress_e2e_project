/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').should('be.visible');
    cy.get('.swal-title').should('contain', 'Welcome');
    cy.get('.swal-button').click();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not sign up with an already taken email', () => {
    cy.register(user.email, user.username, user.password);

    signUpPage.visit();

    signUpPage.typeUsername('another' + user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').should('be.visible');
    cy.get('.swal-title').should('contain', 'Registration failed');
  });
});
