const hectvSites = (sequelize, DataTypes) => sequelize.define('hectv_sites', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.TEXT,
  },
  handle: {
    type: DataTypes.CHAR(255),
  },
  uri: {
    type: DataTypes.TEXT,
  },
}, {});

module.exports = hectvSites;
