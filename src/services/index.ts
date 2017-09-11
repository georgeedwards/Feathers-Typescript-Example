import { users } from './users/users.service';

export default function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
};
