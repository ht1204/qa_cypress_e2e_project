/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject from '../support/pages/profile.pageObject';

const profilePage = new ProfilePageObject();

describe('User', () => {
  let user;
  let targetUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
    });
    cy.task('generateUser').then((generatedTargetUser) => {
      targetUser = generatedTargetUser;
      cy.register(targetUser.email, targetUser.username, targetUser.password);
    });
  });

  it('should be able to follow the another user', () => {
    cy.login(user.email, user.password);
    profilePage.visit(targetUser.username);

    profilePage.assertFollowBtnVisible();
    profilePage.clickFollowBtn();

    profilePage.assertUnfollowBtnVisible();
  });

  it('should be able to unfollow the another user', () => {
    cy.login(user.email, user.password);
    profilePage.visit(targetUser.username);

    profilePage.clickFollowBtn();
    profilePage.assertUnfollowBtnVisible();

    profilePage.clickUnfollowBtn();
    profilePage.assertFollowBtnVisible();
  });
});
