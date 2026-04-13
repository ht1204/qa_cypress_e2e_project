/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject
  from '../support/pages/profile.pageObject';

const profilePage = new ProfilePageObject();

describe('User', () => {
  let user;
  let targetUser;

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
    cy.task('generateUser').then((generatedTargetUser) => {
      targetUser = generatedTargetUser;
      return cy.register(
        targetUser.email,
        targetUser.username,
        targetUser.password
      );
    }).then((registeredTarget) => {
      targetUser = registeredTarget;
    });
  });

  it('should follow another user', () => {
    cy.login(user.email, user.password);
    profilePage.visit(targetUser.username);

    profilePage.assertFollowBtnVisible();
    profilePage.clickFollowBtn();

    profilePage.assertUnfollowBtnVisible();
  });

  it('should unfollow another user', () => {
    cy.login(user.email, user.password);
    profilePage.visit(targetUser.username);

    profilePage.clickFollowBtn();
    profilePage.assertUnfollowBtnVisible();

    profilePage.clickUnfollowBtn();
    profilePage.assertFollowBtnVisible();
  });
});
