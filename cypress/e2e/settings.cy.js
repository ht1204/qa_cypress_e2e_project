/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      return cy.register(
        user.email, user.username, user.password
      );
    }).then((registeredUser) => {
      user = registeredUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.task('generateUser').then((newData) => {
      settingsPage.visit();

      settingsPage.typeUsername(newData.username);
      settingsPage.clickUpdateSettingsBtn();

      cy.get('.swal-title')
        .should('contain', 'Update successful');
      cy.get('.swal-button').click();

      homePage.assertHeaderContainUsername(newData.username);
    });
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'A new bio for testing purposes';
    settingsPage.visit();

    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateSettingsBtn();

    cy.get('.swal-title')
      .should('contain', 'Update successful');
    cy.get('.swal-button').click();

    settingsPage.visit();
    settingsPage.bioField.should('contain', newBio);
  });

  it('should provide an ability to update an email', () => {
    cy.task('generateUser').then((newData) => {
      settingsPage.visit();

      settingsPage.typeEmail(newData.email);
      settingsPage.clickUpdateSettingsBtn();

      cy.get('.swal-title')
        .should('contain', 'Update successful');
      cy.get('.swal-button').click();

      homePage.assertHeaderContainUsername(user.username);
    });
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'NewPass123!';
    settingsPage.visit();

    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateSettingsBtn();

    cy.get('.swal-title')
      .should('contain', 'Update successful');
    cy.get('.swal-button').click();

    settingsPage.clickLogoutBtn();
    cy.url().should('include', '/#/');

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogoutBtn();

    cy.url().should('include', '/#/');
    cy.getByDataCy('username-link').should('not.exist');
  });
});
