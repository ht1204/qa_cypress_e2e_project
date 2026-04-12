const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'realworld', 'user', 'userpassword', {
    host: 'localhost',
    dialect: 'postgres',
    port: 54320,
  }
);

async function clear() {
  const t = await sequelize.transaction();
  try {
    await sequelize.query(
      'DELETE FROM article_comments;', { transaction: t }
    );
    await sequelize.query(
      'DELETE FROM articles_favorites;', { transaction: t }
    );
    await sequelize.query(
      'DELETE FROM articles;', { transaction: t }
    );
    await sequelize.query(
      'DELETE FROM sessions;', { transaction: t }
    );
    await sequelize.query(
      'DELETE FROM users;', { transaction: t }
    );
    await t.commit();
    return null;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

module.exports = { clear };
