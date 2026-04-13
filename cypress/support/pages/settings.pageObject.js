import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataCy('username-settings');
  }

  get bioField() {
    return cy.getByDataCy('bio-settings');
  }

  get emailField() {
    return cy.getByDataCy('email-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-settings');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  typeUsername(username) {
    return this.usernameField.clear().type(username);
  }

  typeBio(bio) {
    return this.bioField.clear().type(bio);
  }

  typeEmail(email) {
    return this.emailField.clear().type(email);
  }

  typePassword(password) {
    return this.passwordField.clear().type(password);
  }

  clickUpdateSettingsBtnAndWait() {
    cy.intercept('POST', '/user').as('updateRequest');
    this.updateSettingsBtn.click();
    return cy.wait('@updateRequest');
  }

  clickUpdateSettingsBtn() {
    return this.updateSettingsBtn.click();
  }

  clickLogoutBtn() {
    return this.logoutBtn.click();
  }
}

export default SettingsPageObject;
