const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { underscoredIf } = require('sequelize/types/utils');

class Comment extends Model {}

Comment.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'post',
        key: 'id'
    }
},
comment_text: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [1]
    }
}

},
{
    sequelize,
freezeTableName: true,
underscored: true,
modelName: 'comment'
}
);

module.exports = Comment;