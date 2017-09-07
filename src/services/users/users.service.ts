import * as createService from 'feathers-sequelize';
import { users } from '../../models/users.model';
const hooks = require('./users.hooks');
const filters = require('./users.filters');

export = function () {
    const app = this;
    const Model = users(app);
    const paginate = app.get('paginate');

    const options = {
        name: 'users',
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use('/users', createService(options));

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('users');

    service.hooks(hooks);

    if (service.filter) {
        service.filter(filters);
    }
};
