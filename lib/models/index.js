import Sequelize from 'sequelize';
import mysql2 from 'mysql2';
import hectvEvents from './hectv_events';
import wpPostmeta from './wp_postmeta';
import wpPosts from './wp_posts';
import hectvSites from './hectv_sites';

const {
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_HOST,
} = process.env;

const sequelize = new Sequelize(
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  {
    host: MYSQL_HOST,
    dialect: 'mysql',
    port: MYSQL_PORT,
    logging: false,
    dialectModule: mysql2,
  },
);

const db = {};
db.hectvSites = hectvSites(sequelize, Sequelize);
db.hectvEvents = hectvEvents(sequelize, Sequelize);
db.wpPostmeta = wpPostmeta(sequelize, Sequelize);
db.wpPosts = wpPosts(sequelize, Sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
