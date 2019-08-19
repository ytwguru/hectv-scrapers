const Postmeta = (sequelize, DataTypes) => sequelize.define('wp_postmeta', {
  meta_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  },
  post_id: { type: DataTypes.BIGINT },
  meta_key: { type: DataTypes.STRING },
  meta_value: { type: DataTypes.TEXT },
}, {
  createdAt: false,
  updatedAt: false,
});

module.exports = Postmeta;
