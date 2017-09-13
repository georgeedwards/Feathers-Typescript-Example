import { hooks as auth} from 'feathers-authentication';
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const local = require('feathers-authentication-local');

const restrict = [
  auth.authenticate('jwt'),
  restrictToOwner({
    idField: 'id',
    ownerField: 'id'
  })
];

export const hooks = {
  before: {
    all: [],
    find: [ auth.authenticate('jwt') ],
    get: [ ...restrict ],
    create: [ local.hooks.hashPassword() ],
    update: [ ...restrict, local.hooks.hashPassword() ],
    patch: [ ...restrict, local.hooks.hashPassword() ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      /*commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )*/
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
