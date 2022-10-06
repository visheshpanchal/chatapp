const { Sequelize } = require("sequelize");

// Adding Details of Sequelize

const sequelize = new Sequelize("chatapp", "root", "1234567890", {
  dialect: "mysql",
  host: "localhost",
});

// Add All Database here
const models = [
  require("../models/user"),
  require("../models/message"),
  require("../models/group"),
  require("../models/groupMessage"),
  require("../models/groupUser"),
];

for (const model of models) {
  model(sequelize);
}

// All Models
const User = sequelize.models.user;
const Message = sequelize.models.message;
const Group = sequelize.models.group;
const groupMessage = sequelize.models.groupMessage;
const groupUser = sequelize.models.groupUser;

// Relationships
User.hasMany(Message, {
  onDelete: "CASCADE",
});
Message.belongsTo(User);

// Group Relationship
Group.belongsToMany(User, {
  onDelete: "CASCADE",
  through: "groupUser",
});

// Group Message Relation
// Include work in this type of relationship
Group.hasMany(groupMessage, {
  onDelete: "CASCADE",
});
groupMessage.belongsTo(Group);
User.hasMany(groupMessage, {
  onDelete: "CASCADE",
});
groupMessage.belongsTo(User);

module.exports = sequelize;
