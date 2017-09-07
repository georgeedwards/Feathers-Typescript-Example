import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as compress from 'compression';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';

import * as feathers from 'feathers';
import * as configuration from 'feathers-configuration';
import * as hooks from 'feathers-hooks';
import * as rest from 'feathers-rest';
import * as socketio from 'feathers-socketio';

import * as handler from 'feathers-errors/handler';
import * as notFound from 'feathers-errors/not-found';

const middleware = require('./middleware');
const services = require('./services');
import { appHooks } from './app.hooks';

const authentication = require('./authentication');
const db = require('./sequelize');


export const app = feathers();

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(db);
app.configure(rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);

app.use(notFound());
app.use(handler());

app.hooks(appHooks);

