const Posts = (sequelize, DataTypes) => sequelize.define('wp_posts', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  },
  post_author: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: false,
  },
  post_title: {
    type: DataTypes.TEXT,
    defaultValue: '',
    allowNull: false,
  },
  post_content: {
    type: DataTypes.TEXT,
    defaultValue: '',
    allowNull: false,
  },
  post_excerpt: {
    type: DataTypes.TEXT,
    defaultValue: '',
    allowNull: false,
  },
  post_status: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
  post_type: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
  post_name: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
  guid: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
  post_parent: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: false,
  },
  menu_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  post_modified_gmt: {
    type: DataTypes.DATE,
    defaultValue: '0000-00-00 00:00:00',
    allowNull: false,
  },
  post_date_gmt: {
    type: DataTypes.DATE,
    defaultValue: '0000-00-00 00:00:00',
    allowNull: false,
  },
  to_ping: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
  pinged: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
  post_content_filtered: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
  post_mime_type: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
}, {
  freezeTableName: true,
  createdAt: 'post_date',
  updatedAt: 'post_modified',
});

module.exports = Posts;
