import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
  }

  get errorMessages() {
    return cy.getByDataCy('error-messages');
  }

  typeUsername(username) {
    return this.usernameField.clear().type(username);
  }

  typeEmail(email) {
    return this.emailField.clear().type(email);
  }

  typePassword(password) {
    return this.passwordField.clear().type(password);
  }

  fillForm({ username, email, password }) {
    this.typeUsername(username);
    this.typeEmail(email);
    this.typePassword(password);
  }

  clickSignUpBtn() {
    return this.signUpBtn.click();
  }
}

export default SignUpPageObject;
