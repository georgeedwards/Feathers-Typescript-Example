import * as Sequelize from 'sequelize';

export function users (app) {
    const sequelizeClient = app.get('sequelizeClient');
    const users = sequelizeClient.define('users', {
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
    }, {
            hooks: {
                beforeCount(options) {
                    options.raw = true;
                }
            }
        });

    users.associate = function (models) { // eslint-disable-line no-unused-vars
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return users;
};
