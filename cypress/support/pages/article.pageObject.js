import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get editArticleBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  clickEditArticleBtn() {
    this.editArticleBtn.click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.click();
  }

  assertArticleTitle(title) {
    cy.get('.article-page h1').should('contain', title);
  }
}

export default ArticlePageObject;
