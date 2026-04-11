import PageObject from '../PageObject';

class ArticleEditPageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('title-input');
  }

  get descriptionField() {
    return cy.getByDataCy('description-input');
  }

  get bodyField() {
    return cy.getByDataCy('body-input');
  }

  get publishBtn() {
    return cy.getByDataCy('publish-btn');
  }

  typeTitle(title) {
    this.titleField.clear().type(title);
  }

  typeDescription(description) {
    this.descriptionField.clear().type(description);
  }

  typeBody(body) {
    this.bodyField.clear().type(body);
  }

  clickPublishBtn() {
    this.publishBtn.click();
  }
}

export default ArticleEditPageObject;
