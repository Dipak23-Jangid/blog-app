import getConfig from 'next/config';
import mysql from 'mysql2/promise';
import { Sequelize, DataTypes } from 'sequelize';

const { serverRuntimeConfig } = getConfig();

export const db = {
    initialized: false,
    initialize
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = userModel(sequelize);
    db.Blog = blogModel(sequelize);

     // define associations
     db.User.hasMany(db.Blog, { foreignKey: 'userId' });
     db.Blog.belongsTo(db.User, { foreignKey: 'userId' });
     
    // sync all models with database
    await sequelize.sync({ alter: true });

    db.initialized = true;
}

// sequelize models with schema definitions of tables

function userModel(sequelize) {
    const attributes = {
        username: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}


function blogModel(sequelize) {
    const attributes = {
        title: { type: DataTypes.STRING, allowNull: false },
        content: { type: DataTypes.TEXT, allowNull: false },
        author: { type: DataTypes.STRING, allowNull: false },
        timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        userId: { type: DataTypes.INTEGER, allowNull: false }
    };

    const options = {
        timestamps: false 
    };

    return sequelize.define('Blog', attributes, options);
}