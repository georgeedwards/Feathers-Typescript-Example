// Initializes the `users` service on path `/users`
import * as createService from 'feathers-memory';
import { hooks } from './users.hooks';
import {filters} from './users.filters';

export function users() {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'users',
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
