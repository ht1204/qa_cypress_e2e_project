import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get editArticleBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  get articleTitle() {
    return cy.get('.article-page h1');
  }

  get articleBody() {
    return cy.get('.article-content .col-xs-12 div')
      .first();
  }

  clickEditArticleBtn() {
    return this.editArticleBtn.click();
  }

  clickDeleteArticleBtn() {
    return this.deleteArticleBtn.click();
  }

  assertArticleTitle(title) {
    return this.articleTitle.should('contain', title);
  }

  assertArticleBody(body) {
    return this.articleBody.should('contain', body);
  }
}

export default ArticlePageObject;
