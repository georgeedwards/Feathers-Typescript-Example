import { parse } from 'url';
import * as Sequelize from 'sequelize';

export = function () {
  const app = this;
  const sequelize = new Sequelize('mssql://root:password@localhost:1433/ts'/*database, username, password, {
    dialect: 'mssql',
    host: hostname,
    logging: false,
    define: {
      freezeTableName: true
    },
    dialectOptions: {
      port,
      instanceName: 'NameOfTheMSSQLInstance'
    }
  }*/);

  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    sequelize.sync();

    return result;
  };
};
