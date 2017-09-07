// Application hooks that run for every service
import { logHook } from './hooks/logger';

export const appHooks = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [logHook],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [logHook],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
