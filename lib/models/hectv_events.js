const hectvEvents = (sequelize, DataTypes) => sequelize.define('hectv_events', {
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
  image: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.TEXT,
  },
  startDate: {
    type: DataTypes.TEXT,
  },
  endDate: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  location: {
    type: DataTypes.TEXT,
  },
  address1: {
    type: DataTypes.TEXT,
  },
  address2: {
    type: DataTypes.TEXT,
  },
  city: {
    type: DataTypes.TEXT,
  },
  state: {
    type: DataTypes.TEXT,
  },
  zip: {
    type: DataTypes.TEXT,
  },
  phone: {
    type: DataTypes.TEXT,
  },
  siteId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'hectv_sites',
      key: 'id',
    },
    allowNull: false,
  },
}, {});

hectvEvents.associate = (models) => {
  hectvEvents.hasOne(models.hectv_sites, { foreignKey: 'siteId' });
};

module.exports = hectvEvents;
